import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProyectoService } from './proyecto.service';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { ROLES } from 'src/constants/roles';
import { Proyecto } from './proyecto.schema';
import { CreateProyectoDTO } from './dtos/CreateProyectoDTO';

@ApiTags('Proyecto')
@ApiBearerAuth('access-token')
@Controller('proyecto')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProyectoController {
    constructor(private proyectoService: ProyectoService) {}

    @Post(":idConvocatoria")
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    async createProyecto(
        @Param('idConvocatoria') idConvocatoria: string,
        @Body() proyecto: CreateProyectoDTO,
    ) {
        return this.proyectoService.createProyecto(idConvocatoria, proyecto);
    }

}
