import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConvocatoriasModule } from '@/convocatorias/convocatoria.module';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { FormatoModule } from '@/formato/formato.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutenticacionModule } from '@/autenticacion/autenticacion.module';
import { ProyectoModule } from '@/proyecto/proyecto.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorLoggerInterceptor } from '@/common/interceptors/error-logger.interceptor';
import { ErrorHandlerInterceptor } from '@/common/interceptors/error-handler.interceptor';
import { LoggerService } from '@/common/services/logger.service';
import { ComunicacionModule } from '@/comunication/comunication.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ConvocatoriasModule,
    UsuariosModule,
    FormatoModule,
    AutenticacionModule,
    ProyectoModule,
    ComunicacionModule,
    CommonModule
  ],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlerInterceptor,
    }
  ]
}

)
export class AppModule { }
