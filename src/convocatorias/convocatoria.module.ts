import { Module } from '@nestjs/common';
import { ConvocatoriasController } from './convocatoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Convocatoria, ConvocatoriaSchema } from './convocatoria.schema';
import { ConvocatoriasService } from './convocatoria.service';

@Module({
  controllers: [ConvocatoriasController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Convocatoria.name,
        schema: ConvocatoriaSchema,
      },
    ]),
  ],
  providers: [ConvocatoriasService],
  exports: [ConvocatoriasService]
})
export class ConvocatoriasModule {}
