import { Module } from '@nestjs/common';
import { ComunicacionController } from '@/comunication/comunicacion.controller';
import { EmailModule } from '@/comunication/email/email.module';
// 1. Importa las herramientas que necesitamos
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [ComunicacionController],
  exports: [EmailModule]
})
export class ComunicacionModule {}