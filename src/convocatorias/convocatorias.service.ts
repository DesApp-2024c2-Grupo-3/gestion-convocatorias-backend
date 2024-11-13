import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Convocatorias } from './convocatorias.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConvocatoriasService {
    constructor(@InjectModel(Convocatorias.name) private convoctariasModel: Model<Convocatorias>) {}

    async get(): Promise<Convocatorias[]> {
        return this.convoctariasModel.find().exec()
    }

    async create(convocatoria: Convocatorias) {
        const createdConvocatoria = new this.convoctariasModel(convocatoria);
        return createdConvocatoria.save();
    }
}
