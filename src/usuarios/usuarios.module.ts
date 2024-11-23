import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario, UsuarioSchema } from './usuarios.schema';
import { ConvocatoriasModule } from 'src/convocatorias/convocatorias.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    ConvocatoriasModule,
  ],
  controllers: [UsuariosController],  
  providers: [UsuariosService],       
})
export class UsuariosModule {}
