import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto } from './proyecto.schema';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectModel(Proyecto.name)
        private proyectoModel: Model<Proyecto>
    ) {}
    
}
