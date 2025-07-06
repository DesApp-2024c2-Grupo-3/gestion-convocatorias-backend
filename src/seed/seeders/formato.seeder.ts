import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formato } from '../../formato/formato.schema';
import { formatosData } from '../data/formatos.data';

export class FormatoSeeder {
  private formatoModel: Model<Formato>;

  constructor(private app: INestApplicationContext) {
    this.formatoModel = app.get<Model<Formato>>(getModelToken(Formato.name));
  }

  async seed(): Promise<any[]> {
    await this.formatoModel.deleteMany({});
    console.log('🗑️ Todos los formatos anteriores eliminados.');

    const formatosCreados = [];
    for (const formatoData of formatosData) {
      let formato = await this.formatoModel.findOne({ nombreDelFormato: formatoData.nombreDelFormato });
      if (!formato) {
        formato = new this.formatoModel(formatoData);
        await formato.save();
        console.log(`✅ Formato "${formatoData.nombreDelFormato}" creado`);
      } else {
        console.log(`✅ Formato "${formatoData.nombreDelFormato}" ya existe`);
      }
      formatosCreados.push(formato);
    }
    return formatosCreados;
  }
}