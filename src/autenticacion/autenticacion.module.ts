import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacionController } from '@/autenticacion/autenticacion.controller';
import { AutenticacionService } from '@/autenticacion/autenticacion.service';
import { Usuario, UsuarioSchema } from '@/usuarios/usuarios.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenModule } from '@/auth/token.module';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { EmailModule } from '@/comunication/email/email.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    TokenModule,
    UsuariosModule,
    EmailModule,
    CommonModule
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService],
  exports: [AutenticacionService],
})
export class AutenticacionModule {}
