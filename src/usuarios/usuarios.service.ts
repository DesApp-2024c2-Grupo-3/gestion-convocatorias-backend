import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from '@/usuarios/usuarios.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from '@/common/constants/roles';  
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDTO } from '@/usuarios/dtos/UpdatePasswordDTO';
import { UpdateRolesDTO } from '@/usuarios/dtos/UpdateRolesDTO';
import { RegisterDTO } from '@/autenticacion/dtos/RegisterDTO';

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
  ) { }

  async createUser(createUserDTO: RegisterDTO) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

      const nuevoUsuario = new this.usuarioModel({
        ...createUserDTO,
        password: hashedPassword,
        roles: [ROLES.INVESTIGADOR],
        baja: false
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
      cvId: usuario._id,
      cvNombre: usuario.cv.nombre,
      roles: usuario.roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSvc.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtSvc.signAsync(jwtPayload, {
        secret: 'jwt_secret_refresh',
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
        secret: 'jwt_secret_refresh',
      });

      const usuarioActualizado = await this.usuarioModel.findById(usuario._id);

      const payload = {
        sub: usuarioActualizado._id,
        email: usuarioActualizado.email,
        nombre: usuarioActualizado.nombre,
        cvId: usuarioActualizado._id,
        cvNombre: usuarioActualizado.cv.nombre,
        roles: usuarioActualizado.roles
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
    return await this.usuarioModel.find().select('-password').exec();
  }

  async obtenerUsuario(id: string): Promise<Usuario> {

    if (Types.ObjectId.isValid(id) === false) {
      throw new BadRequestException('El id no es válido');
    }

    const usuarioExistente = await this.usuarioModel.findById(id).select('-password').exec();

    if (!usuarioExistente) {
      throw new BadRequestException('No existe el usuario con id buscado');
    }

    return usuarioExistente;
  }

  async eliminarUsuario(email: string) {
    const usuarioExistente = await this.usuarioModel.findOne({ email }).exec();

    if (!usuarioExistente) {
      throw new BadRequestException(
        'No existe un usuario con ese mail',
      );
    };

    usuarioExistente.baja = true
    await usuarioExistente.save()
    return {
      message: 'Usuario dado de baja exitosamente',
      status: HttpStatus.OK,
    };
  };

  private sacarContrasenia(usuario) {
    const { password, ...rest } = usuario;
    return rest;
  };

  async updateContrasenia(email: string, nuevaContrasenia: UpdatePasswordDTO) {
    try {
      const usuario = await this.usuarioModel.findOne({ email });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const hashedPassword = await bcrypt.hash(nuevaContrasenia.password, 10);

      usuario.password = hashedPassword;
      await usuario.save();
      return {
        message: 'contraseña actualizada correctamente',
        status: HttpStatus.OK,
      }
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la contraseña');
    };
  };

  async updateRoles(email: string, nuevosRoles: UpdateRolesDTO) {
    try {
      const usuario = await this.usuarioModel.findOne({ email });

      if (!usuario) {
        throw new NotFoundException("Usuario no encontrado")
      }

      usuario.roles = nuevosRoles.roles
      await usuario.save()
      return {
        message: "Roles actualizados correctamente",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new InternalServerErrorException("Error al actualizar roles")
    }
  }

  async updateCv(email: string, archivo: Express.Multer.File) {
    const usuario = await this.usuarioModel.findOne({ email });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

    try {
      const cv = {
        nombre: archivo.originalname,
        tipo: archivo.mimetype,
        contenido: archivo.buffer,
      }

      usuario.cv = cv
      await usuario.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar cv');
    };

    const usuarioActualizado = await this.usuarioModel.findById(usuario._id);

  const { access_token, refresh_token } = await this.generateTokens(usuarioActualizado);
  return {
    message: "CV actualizado",
    access_token,
    refresh_token,
    user_id: usuarioActualizado._id
  }
};
};
