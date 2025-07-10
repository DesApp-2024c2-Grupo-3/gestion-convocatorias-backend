import { Module } from '@nestjs/common';
import { ProyectoController } from '@/proyecto/proyecto.controller';
import { ProyectoService } from '@/proyecto/proyecto.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from '@/proyecto/proyecto.schema';
import { ConvocatoriasModule } from '@/convocatorias/convocatoria.module';
import { UsuariosModule } from '@/usuarios/usuarios.module';

@Module({
  controllers: [ProyectoController],
  imports: [
    MongooseModule.forFeature([
        {
            name: Proyecto.name,
            schema: ProyectoSchema,
        },
    ]),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (ConfigService: ConfigService) => ({
            secret: ConfigService.get<string>("JWT_SECRET"),
            signOptions: { expiresIn: '60m' }
        })
    }),
    ConvocatoriasModule,
    UsuariosModule
  ],
  providers: [ProyectoService]
})
export class ProyectoModule {}
