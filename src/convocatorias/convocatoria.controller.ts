import { Controller, Post, Body, Get, Param, Put, ValidationPipe, Delete, UseInterceptors, UploadedFile, Patch, UseGuards, Res, StreamableFile, Header, NotFoundException } from '@nestjs/common';
import { ConvocatoriasService } from './convocatoria.service';
import { Convocatoria } from './convocatoria.schema';
import { updateConvocatoriaDTO } from './dtos/UpdateConvocatoriasDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateConvocatoriaDto } from './dtos/CreateConvocatoriaDTO';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES } from '../constants/roles';
import { HasRoles } from '../auth/decorators/has-roles.decorator';

import { ApiOperation, ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Convocatorias')
@ApiBearerAuth('access-token')
@Controller('convocatoria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConvocatoriasController {
    constructor(private convocatoriasService: ConvocatoriasService) { }

    @Get()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Obtener todas las convocatorias' })
    @ApiResponse({ status: 200, description: 'Lista de convocatorias', type: [Convocatoria] })
    @ApiResponse({ 
        status: 400, 
        description: 'Datos inválidos' 
    })
    async get(): Promise<Convocatoria[]> {
        return this.convocatoriasService.get();
    }

    @Get(':id')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Obtener una convocatoria por ID' })
    @ApiResponse({ status: 200, description: 'Convocatoria encontrada', type: Convocatoria })
    @ApiResponse({ status: 404, description: 'Convocatoria no encontrada' })
    async getConvocatoria(@Param('id') id: string): Promise<Convocatoria> {
        return this.convocatoriasService.getConvocatoria(id);
    }

    @Get("archivo/:id")
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'inline; filename="documento.pdf"')
    async getArchivo(@Param('id') id: string): Promise<StreamableFile> {
        const archivo = await this.convocatoriasService.getArchivoDeConvocatoria(id);

        return new StreamableFile(archivo.contenido, {
            type:archivo.tipo,
            disposition: `inline; filename="${archivo.nombre}"`
        });
    }

    @Post()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    @UseInterceptors(FileInterceptor('archivo'))
    async create(
        @Body() CreateConvocatoriaDto: CreateConvocatoriaDto,
        @UploadedFile() archivo: Express.Multer.File
    ) {
        return this.convocatoriasService.create(CreateConvocatoriaDto, archivo);
    }

    @Put(':id')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    @UseInterceptors(FileInterceptor('archivo'))
    async updateConvocatoria(
        @Param('id') id: string,
        @Body(new ValidationPipe()) edicionDeConvocatoria: updateConvocatoriaDTO,
        @UploadedFile() archivo?: Express.Multer.File
    ) {
        return this.convocatoriasService.updateConvocatoria(id, edicionDeConvocatoria, archivo);
    }

    @Delete(':_id')
    @HasRoles(ROLES.SUPER_ADMIN)
    async eliminarConvocatoria(@Param('_id') _id: string) {
        return this.convocatoriasService.eliminarConvocatoria(_id);
    }
}
