import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Convocatoria } from './convocatoria.schema';
import { ClientSession, Model, Error as MongooseError } from 'mongoose';
import { ObjectId } from 'mongoose';
import { Types } from 'mongoose';
import { UpdateConvocatoriaDTO } from './dtos/UpdateConvocatoriasDTO';
import { CreateConvocatoriaDto } from './dtos/CreateConvocatoriaDTO';
import { FormatoService } from '@/formato/formato.service';
import { ErrorMessages } from '../common/constants/error-message';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ConvocatoriasService {
  constructor(
    @InjectModel(Convocatoria.name) private convoctariasModel: Model<Convocatoria>,
    private readonly formatoService: FormatoService
  ) { }

  async get(): Promise<Convocatoria[]> {
    return this.convoctariasModel.find().select("-archivo").exec();
  }

  async getConvocatoria(id: string): Promise<Convocatoria> {
    try {
      
      if (Types.ObjectId.isValid(id) === false) {
        throw new BadRequestException(ErrorMessages.INVALID_ID);
      }
      
      const convocatoriaExistente = await this.convoctariasModel
        .findById(id)
        .select("-archivo")
        .exec();

      if (!convocatoriaExistente) {
        throw new NotFoundException(ErrorMessages.NOT_FOUND);
      }

      return convocatoriaExistente;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof MongooseError) {
        throw new InternalServerErrorException(ErrorMessages.DATABASE_ERROR);
      }

      throw new InternalServerErrorException(ErrorMessages.INTERNAL_ERROR);
    }
  }

  async create(CreateConvocatoriaDto: CreateConvocatoriaDto, archivo: Express.Multer.File) {
    const nuevaConvocatoria = new this.convoctariasModel({
      ...CreateConvocatoriaDto,
      archivo: {
        nombre: archivo.originalname,
        tipo: archivo.mimetype,
        contenido: archivo.buffer,
      },
      proyectos: [],
      baja: false
    });
    return nuevaConvocatoria.save();
  }

  async updateConvocatoria(id: string, convocatoria: UpdateConvocatoriaDTO, archivo?: Express.Multer.File, session?: ClientSession) {

    if (Types.ObjectId.isValid(id) === false) {
      throw new BadRequestException(ErrorMessages.INVALID_ID.message);
    }

    const convocatoriaActual = await this.convoctariasModel.findById(id).session(session).exec();

    if (!convocatoriaActual) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND.message);
    }

    if (convocatoria.formato) {
      let formato = await this.formatoService.getFormatoById(convocatoria.formato)
      if (!formato) {
        throw new BadRequestException(ErrorMessages.INVALID_FORMATO.message);
      }
    }

    const edicionDeConvocatoria: UpdateConvocatoriaDTO & {
      archivo?: {
        nombre: string;
        tipo: string;
        contenido: Buffer;
      }
    } = {
      ...convocatoria,
    }

    if (archivo) {
      edicionDeConvocatoria.archivo = {
        nombre: archivo.originalname,
        tipo: archivo.mimetype,
        contenido: archivo.buffer,
      }
    }

    if (Array.isArray(convocatoria.proyectos)) {
      edicionDeConvocatoria.proyectos = Array.from(
        new Set([
          ...convocatoriaActual.proyectos.map((p: any) => p.toString()),
          ...convocatoria.proyectos,
        ])
      );
    }
    try {
      await convocatoriaActual.updateOne(edicionDeConvocatoria, session ? { session } : {}).exec()
      return { message: "Convocatoria actualizada exitosamente" }
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(
          Object.values(error.errors).map((e: any) => e.message).join(', ')
        );
      }
      throw new InternalServerErrorException(ErrorMessages.INTERNAL_ERROR.message);
    }
  }

  async eliminarConvocatoria(_id: string) {

    if (Types.ObjectId.isValid(_id) === false) {
      throw new BadRequestException(ErrorMessages.INVALID_ID.message);
    }

    const convocatoriaExistente = await this.convoctariasModel
      .findByIdAndUpdate(_id, { baja: true }, { new: true })
      .select("-archivo")
      .exec();

    if (!convocatoriaExistente) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND.message);
    }

    return convocatoriaExistente
  }

  async getArchivoDeConvocatoria(id: string) {

    if (Types.ObjectId.isValid(id) === false) {
      throw new BadRequestException(ErrorMessages.INVALID_ID.message);
    }

    const convocatoria = await this.convoctariasModel.findById(id).select("archivo").exec()

    if (!convocatoria) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND.message);
    }

    return convocatoria.archivo
  }
  /* 
    async getProyectosDeConvocatoria(idConvocatoria: string) {
      if (!Types.ObjectId.isValid(idConvocatoria)) {
          throw new BadRequestException('ID de convocatoria inválido');
      }
  
      const convocatoria = await this.convoctariasModel
          .findById(idConvocatoria)
          .populate('proyectos') 
          .exec();
  
      if (!convocatoria) {
          throw new NotFoundException('Convocatoria no encontrada');
      }
  
      return convocatoria.proyectos;
    }
  */
}
