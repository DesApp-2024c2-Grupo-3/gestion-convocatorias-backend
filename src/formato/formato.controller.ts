import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FormatoService } from './formato.service';
import { Formato } from './formato.schema';
import { CreateFormatoDto } from './dtos/CreateFormatoDTO';

@Controller('formato')
export class FormatoController {
    constructor(private formatoService: FormatoService) {}

    @Get()
    async get(): Promise<Formato[]> {
        return this.formatoService.getAllFormatos();
    }

    @Get(':id')
    async getFormatoById(@Param('id') id: string): Promise<Formato> {
        return this.formatoService.getFormatoById(id);
    }

    @Get('nombre/:nombre')
    async getFormatoByNombre(@Param('nombre') nombre:string): Promise<Formato> {
        return this.formatoService.getFormatoByNombre(nombre)
    }

    @Post()
    async create (@Body() formato: CreateFormatoDto) {
        return this.formatoService.createFormato(formato)
    }
}
