import { Controller, Post, Body, Get} from '@nestjs/common';
import { ConvocatoriasService } from './convocatorias.service';
import { Convocatorias } from './convocatorias.schema';

@Controller('convocatorias')
export class ConvocatoriasController {
    
    constructor(private convocatoriasService: ConvocatoriasService) {}

    @Get()
    async get(): Promise<Convocatorias[]> {
        return this.convocatoriasService.get()
    }

    @Post()
    async create(@Body() convocatoria: any) {
        return this.convocatoriasService.create(convocatoria);
    }
}
