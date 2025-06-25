import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from '@/usuarios/usuarios.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from '@/common/constants/roles';
import { TokenService } from '@/auth/services/token.service';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ErrorMessages } from '@/common/constants/error-message';
import { SendEmailDTO } from '@/comunication/email/dtos/send-email.dto';
import { EmailService } from '@/comunication/email/email.service';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { RecoverPasswordDTO } from '@/autenticacion/dtos/RecoverPasswordDTO';
import { ValidationMailjetService } from '@/common/services/validationMailJet.service';
import { LoggerService } from '@/common/services/logger.service';

@Injectable()
export class AutenticacionService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
    private readonly emailService: EmailService,
    private readonly validationMailjetService: ValidationMailjetService,
    private readonly logger: LoggerService
  ) {}


  async register(nombre: string, email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const nuevoUsuario = new this.usuarioModel({
        nombre,
        email,
        password: hashedPassword,
        roles: [ROLES.INVESTIGADOR],
        baja: false
      });

      const usuario = await nuevoUsuario.save();

      const { access_token, refresh_token } = await this.tokenService.generateTokens(usuario);

      return {
        success: true,
        access_token,
        refresh_token,
        usuario: this.sacarContrasenia(usuario),
        message: 'Usuario registrado exitosamente',
      };
    } catch (error) {
      this.logger.error(error.message);

      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        throw new BadRequestException({
          message: ErrorMessages.EMAIL_ALREADY_REGISTERED.message,
          error: ErrorMessages.EMAIL_ALREADY_REGISTERED.error,
          statusCode: HttpStatus.BAD_REQUEST
        });
      }

      throw new BadRequestException('Error al registrar usuario');
    }
  }

  async login(email: string, password: string) {
    const usuario = await this.usuarioModel.findOne({ email });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta.');
    }

    const payload = {
      sub: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      roles: usuario.roles,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: 'jwt_secret_refresh',
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
      usuario: this.sacarContrasenia(usuario),
      message: 'Login exitoso',
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const usuario = this.jwtService.verify(refreshToken, {
        secret: 'jwt_secret_refresh',
      });

      const payload = {
        sub: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
      };

      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      });

      const refresh_token = await this.jwtService.signAsync(payload, {
        secret: 'jwt_secret_refresh',
        expiresIn: '7d',
      });

      return {
        access_token,
        refresh_token,
        status: 200,
        message: 'Refresh token exitoso',
      };
    } catch (error) {
      throw new HttpException('Falló el refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDTO) {
    try {
      const { email } = recoverPasswordDto;

      const mailjetStatus = await this.validationMailjetService.validateMailjetConnection();
      if (!mailjetStatus.isConnected) {
        this.logger.error('El servicio de email no está disponible. Inténtelo más tarde.');
        throw new InternalServerErrorException('El servicio de email no está disponible. Inténtelo más tarde.');
      }
 
      const usuario = await this.usuarioModel.findOne({ email });
      if (!usuario) {
        this.logger.error('No existe un usuario con ese email');
        throw new NotFoundException(ErrorMessages.USER_NOT_FOUND.message);
      }

      const newPassword = this.generateTemporaryPassword();

      await this.usuariosService.updateContrasenia(email, { password: newPassword });
      
      const emailData: SendEmailDTO = {
        fromEmail: '',
        toEmail: email,
        toName: usuario.nombre,
        type: 'recuperar_contrasena',
        subject: '',
        variables: {
          newPassword: newPassword,
          toName: usuario.nombre
        }
      };

      const emailResult = await this.emailService.sendEmail(emailData);

      return {
        success: emailResult.status,
        message: `Se ha enviado una nueva contraseña a ${email}`,
        status: HttpStatus.OK,
      };

    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw new NotFoundException(ErrorMessages.USER_NOT_FOUND.message);
      }
      if (error instanceof InternalServerErrorException) {
        this.logger.error(error.message);
        throw error;
      }
      this.logger.error(error.message);
      throw new InternalServerErrorException(ErrorMessages.PASSWORD_RECOVERY_ERROR.message);
    }
  }

  private sacarContrasenia(usuario: UsuarioDocument) {
    const { password, ...rest } = usuario.toObject();
    return rest;
  }

  private generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }
}
