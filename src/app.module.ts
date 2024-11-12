import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:DesApp@clusterdesapp.1esjv.mongodb.net/BD-GestionConvocatorias?retryWrites=true&w=majority&appName=ClusterDesApp')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
