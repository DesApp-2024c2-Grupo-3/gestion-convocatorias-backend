import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formato } from './formato.schema';

@Injectable()
export class FormatoService {
    constructor (
        @InjectModel(Formato.name)
        private formatoModel: Model<Formato>
    ) {}

    async getAllFormatos(): Promise<Formato[]> {
        return this.formatoModel.find().exec();
    }

    async getFormatoById(id: string): Promise<Formato> {
        const formatoExistente = await this.formatoModel.findById(id).exec();

        if (!formatoExistente) {
            throw new Error('El formato no existe');
        }

        return formatoExistente;
    }

    async getFormatoByNombre(nombre: string): Promise<Formato> {
        const formatoExistente = await this.formatoModel.findOne({nombreDelFormato: nombre}).exec();

        if (!formatoExistente) {
            throw new Error('El formato no existe')
        }
        
        return formatoExistente
    }

    async createFormato(formato: Formato) {
        const  createdFormato = new this.formatoModel(formato);
        return createdFormato.save();
    }
}
