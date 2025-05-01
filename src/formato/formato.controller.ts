import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FormatoService } from './formato.service';
import { Formato } from './formato.schema';
import { CreateFormatoDto } from './dtos/CreateFormatoDTO';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { ROLES } from 'src/constants/roles';

@Controller('formato')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FormatoController {
    constructor(private formatoService: FormatoService) {}

    @Get()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    async get(): Promise<Formato[]> {
        return this.formatoService.getAllFormatos();
    }

    @Get(':id')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    async getFormatoById(@Param('id') id: string): Promise<Formato> {
        return this.formatoService.getFormatoById(id);
    }

    @Post()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    async create (@Body() formato: CreateFormatoDto) {
        return this.formatoService.createFormato(formato)
    }
}
