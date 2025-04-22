import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './usuarios.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { ROLES } from '../constants/roles';
import { ConfigService } from '@nestjs/config';


type Tokens = {
    access_token: string,
    refresh_token: string
}

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,
    private jwtSvc: JwtService,
    private configService: ConfigService
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

      const nuevoUsuario = new this.usuarioModel({
        ...createUserDTO,
        password: hashedPassword,
        roles: [ROLES.INVESTIGADOR],
      });

      const usuario = await nuevoUsuario.save();
      const { access_token, refresh_token } =
        await this.generateTokens(usuario);

      return {
        access_token,
        refresh_token,
        usuario: this.sacarContrasenia(usuario),
        status: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente',
      };
    } catch (error) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const usuario = await this.usuarioModel.findOne({ email });

      if (!usuario) {
        throw new BadRequestException('Usuario no encontrado.');
      }

      const isPasswordValid = await bcrypt.compare(password, usuario.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Contraseña incorrecta.');
      }

      if (usuario && isPasswordValid) {
        const payload = {
          sub: usuario._id,
          email: usuario.email,
          nombre: usuario.nombre,
          roles: usuario.roles 
        };

        const { access_token, refresh_token } =
          await this.generateTokens(payload);

          
        return {
          access_token,
          refresh_token,
          usuario: this.sacarContrasenia(usuario),
          message: 'Login exitoso',
        };
      }
    } catch (error) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async generateTokens(usuario): Promise<Tokens> {
    const jwtPayload = {
      sub: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      roles: usuario.roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSvc.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtSvc.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET_REFRESH'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken) {
    try {
      const usuario = this.jwtSvc.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH'),
      });
      const payload = {
        sub: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
      };
      const { access_token, refresh_token } =
        await this.generateTokens(payload);
      return {
        access_token,
        refresh_token,
        status: 200,
        message: 'Refresh token exitoso',
      };
    } catch (error) {
      throw new HttpException(
        'Falló el refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    return await this.usuarioModel.find().exec();
  }

  async obtenerUsuario(id: string): Promise<Usuario> {
    const usuarioExistente = await this.usuarioModel.findById(id).exec();

    if (!usuarioExistente) {
      throw new BadRequestException('No existe el usuario con id buscado');
    }

    return usuarioExistente;
  }

  // psoiblemente no sea necesario - Ahora sí fue necesario :)
  async eliminarUsuario(email: string) {
    const usuarioExistente = await this.usuarioModel.findOne({ email }).exec();

    if (!usuarioExistente) {
      throw new BadRequestException(
        'No existe un usuario con el email proporcionado',
      );
    };

    await this.usuarioModel.deleteOne({ email }).exec();
    return {
      message: 'Usuario eliminado exitosamente',
      status: HttpStatus.OK,
    };
  };

  private sacarContrasenia(usuario) {
    const { password, ...rest } = usuario;
    return rest;
  };

  async updateContrasenia(email: string, nuevaContrasenia: string){
    try{
        const usuario = await this.usuarioModel.findOne({email});

        if(!usuario){
            throw new NotFoundException('Usuario no encontrado');
        }

        const hashedPassword = await bcrypt.hash(nuevaContrasenia, 10);

        usuario.password = nuevaContrasenia;
        await usuario.save();
        return{
            message: 'contraseña actualizada correctamente',
            status: HttpStatus.OK,
        }
    }catch(error){
        throw new InternalServerErrorException('Error al actualizar la contraseña');
    };
  };
};
