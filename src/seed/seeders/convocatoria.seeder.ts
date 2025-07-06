// src/seed/seeders/convocatoria.seeder.ts

import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Convocatoria } from '../../convocatorias/convocatoria.schema';
import { Formato } from '../../formato/formato.schema';
import { convocatoriasData } from '../data/convocatorias.data';

export class ConvocatoriaSeeder {
  private convocatoriaModel: Model<Convocatoria>;
  private formatoModel: Model<Formato>;

  constructor(private app: INestApplicationContext) {
    this.convocatoriaModel = app.get<Model<Convocatoria>>(getModelToken(Convocatoria.name));
    this.formatoModel = app.get<Model<Formato>>(getModelToken(Formato.name));
  }

  async seed(): Promise<void> {
    // Borra todas las convocatorias existentes
    await this.convocatoriaModel.deleteMany({});
    console.log('🗑️ Todas las convocatorias anteriores eliminadas.');

    for (const convocatoriaData of convocatoriasData) {
      // Busca el formato por nombre
      const formato = await this.formatoModel.findOne({ nombreDelFormato: convocatoriaData.nombreFormato });
      if (!formato) {
        console.log(`❌ Formato "${convocatoriaData.nombreFormato}" no encontrado para la convocatoria "${convocatoriaData.titulo}"`);
        continue;
      }

      // Crea la convocatoria asociando el formato
      const nuevaConvocatoria = new this.convocatoriaModel({
        ...convocatoriaData,
        formato: formato._id,
        proyectos: [],
        baja: false
      });

      await nuevaConvocatoria.save();
      console.log(`✅ Convocatoria "${convocatoriaData.titulo}" creada`);
    }
  }
}