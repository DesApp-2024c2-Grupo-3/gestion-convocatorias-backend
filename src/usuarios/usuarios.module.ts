import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from '@/usuarios/usuarios.controller';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { Usuario, UsuarioSchema } from '@/usuarios/usuarios.schema';
import { ConvocatoriasModule } from '@/convocatorias/convocatoria.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    ConvocatoriasModule,
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>("JWT_SECRET"),
            signOptions: { expiresIn: "60m" }
        })
    })
  ],
  controllers: [UsuariosController],  
  providers: [UsuariosService, JwtService],     
  exports: [UsuariosService]  
})
export class UsuariosModule {}
