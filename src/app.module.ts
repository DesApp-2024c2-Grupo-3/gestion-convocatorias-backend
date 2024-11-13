import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConvocatoriasModule } from './convocatorias/convocatorias.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:DesApp@clusterdesapp.1esjv.mongodb.net/BD-GestionConvocatorias?retryWrites=true&w=majority&appName=ClusterDesApp'), ConvocatoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
