import { Module } from '@nestjs/common';
import { ConvocatoriasController } from './convocatorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Convocatorias, ConvocatoriasSchema } from './convocatorias.schema';
import { ConvocatoriasService } from './convocatorias.service';

@Module({
  controllers: [ConvocatoriasController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Convocatorias.name,
        schema: ConvocatoriasSchema
      }
    ])
  ],
  providers: [ConvocatoriasService]
})
export class ConvocatoriasModule {}
