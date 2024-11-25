import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Convocatorias } from './convocatorias.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConvocatoriasService {
  constructor(
    @InjectModel(Convocatorias.name)
    private convoctariasModel: Model<Convocatorias>,
  ) {}

  async get(): Promise<Convocatorias[]> {
    return this.convoctariasModel.find().exec();
  }

  async getConvocatoria(id: string): Promise<Convocatorias> {
    const convocatoriaExistente = await this.convoctariasModel
      .findById(id)
      .exec();

    if (!convocatoriaExistente) {
      throw new BadRequestException('La convocatoria no existe');
    }

    return convocatoriaExistente;
  }

  async create(convocatoria: Convocatorias) {
    const createdConvocatoria = new this.convoctariasModel(convocatoria);
    return createdConvocatoria.save();
  }

  async updateConvocatoria(
    _id: string,
    convocatoria: Convocatorias,
  ): Promise<Convocatorias> {
    const convocatoriaActualizada = await this.convoctariasModel
      .findByIdAndUpdate(
        _id,
        {
          $set: convocatoria,
        },
        { new: true },
      )
      .exec();

    if (!convocatoriaActualizada) {
      throw new BadRequestException(
        'La convocatoria que desea actualizar, no existe',
      );
    }

    return convocatoriaActualizada;
  }

  async eliminarConvocatoria(_id: string) {
    const convocatoriaExistente = await this.convoctariasModel
      .findById(_id)
      .exec();

    if (!convocatoriaExistente) {
      throw new BadRequestException('NO EXISTE');
    }

    await this.convoctariasModel.findByIdAndDelete(_id).exec();
  }
}
