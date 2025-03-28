import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConvocatoriasModule } from './convocatorias/convocatoria.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FormatoModule } from './formato/formato.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:DesApp@clusterdesapp.1esjv.mongodb.net/BD-GestionConvocatorias?retryWrites=true&w=majority&appName=ClusterDesApp'),
   ConvocatoriasModule,
   UsuariosModule,
   FormatoModule],
}
  
)
export class AppModule {}
