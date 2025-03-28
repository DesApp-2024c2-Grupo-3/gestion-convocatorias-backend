import { Controller, Post, Body, Get, Param, Put, ValidationPipe, Delete, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { ConvocatoriasService } from './convocatoria.service';
import { Convocatoria } from './convocatoria.schema';
import { updateConvocatoriaDTO } from './dtos/updateConvocatoriasDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateConvocatoriaDto } from './dtos/CreateConvocatoriaDTO';
import { UpdateFechaFinDto } from './dtos/UpdateFechaFinDTO';


@Controller('convocatoria')
export class ConvocatoriasController {
    constructor(private convocatoriasService: ConvocatoriasService) { }

    @Get()
    async get(): Promise<Convocatoria[]> {
        return this.convocatoriasService.get();
    }

    @Get(':id')
    async getConvocatoria(@Param('id') id: string): Promise<Convocatoria> {
        return this.convocatoriasService.getConvocatoria(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('archivo'))
    async create(
        @Body() CreateConvocatoriaDto: CreateConvocatoriaDto,
        @UploadedFile() archivo: Express.Multer.File
    ) {
        return this.convocatoriasService.create(CreateConvocatoriaDto, archivo);
    }

    @Put(':id')
    async updateConvocatoria(
        @Param('id') id: string,
        @Body(new ValidationPipe()) convocatoria: updateConvocatoriaDTO,
    ) {
        return this.convocatoriasService.updateConvocatoria(id, convocatoria);
    }

    @Patch(':id/fecha-fin')
    async updateFechaFin(
        @Param('id') id: string,
        @Body() body: UpdateFechaFinDto,
    ): Promise<Convocatoria> {
        console.log('se ejecuta el controller')
        return this.convocatoriasService.updateFechaFin(id, body);
    }

    @Delete(':_id')
    async eliminarConvocatoria(@Param('_id') _id: string) {
        return this.convocatoriasService.eliminarConvocatoria(_id);
    }
}
