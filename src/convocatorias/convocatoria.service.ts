import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Convocatoria } from './convocatoria.schema';
import { Model } from 'mongoose';
import { updateConvocatoriaDTO } from './dtos/updateConvocatoriasDTO';
import { CreateConvocatoriaDto } from './dtos/CreateConvocatoriaDTO';
import { UpdateFechaFinDto } from './dtos/UpdateFechaFinDTO';

@Injectable()
export class ConvocatoriasService {
  constructor(
    @InjectModel(Convocatoria.name)
    private convoctariasModel: Model<Convocatoria>,
  ) {}

  async get(): Promise<Convocatoria[]> {
    return this.convoctariasModel.find().exec();
  }

  async getConvocatoria(id: string): Promise<Convocatoria> {
    const convocatoriaExistente = await this.convoctariasModel
      .findById(id)
      .exec();

    if (!convocatoriaExistente) {
      throw new BadRequestException('La convocatoria no existe');
    }

    return convocatoriaExistente;
  }

  async create(CreateConvocatoriaDto: CreateConvocatoriaDto, archivo: Express.Multer.File) {
    const nuevaConvocatoria = new this.convoctariasModel({
        ...CreateConvocatoriaDto,
        archivo: {
            nombre: archivo.originalname,
            tipo: archivo.mimetype,
            contenido: archivo.buffer,
        }
    });
    return nuevaConvocatoria.save();
  }

  async updateConvocatoria(id: string, convocatoria: updateConvocatoriaDTO) {
    const convocatoriaActualizada = await this.convoctariasModel
      .findByIdAndUpdate(
        id,
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

  async updateFechaFin(id: string, fechaFin: UpdateFechaFinDto): Promise<Convocatoria> {
    console.log(fechaFin)
    const convocatoriaActualizada = await this.convoctariasModel
      .findByIdAndUpdate(
        id,
        fechaFin
      )
      .exec();

    if (!convocatoriaActualizada) {
      throw new BadRequestException(
        'La convocatoria que desea actualizar no existe',
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
