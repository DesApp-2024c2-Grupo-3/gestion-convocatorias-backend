    import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
    import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
    import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
    import { RolesGuard } from '@/auth/guards/roles.guard';
    import { ProyectoService } from './proyecto.service';
    import { HasRoles } from '@/auth/decorators/has-roles.decorator';
    import { ROLES } from '@/common/constants/roles';
    import { Proyecto } from './proyecto.schema';
    import { CreateProyectoDTO } from './dtos/CreateProyectoDTO';
    import { ApiSuccessResponse, ApiCreatedResponse,ApiCommonResponses, ApiNotFoundResponse } from '../common/decorators/api-response.decorator';

    @ApiTags('Proyecto')
    @ApiBearerAuth('access-token')
    @Controller('proyecto')
    @UseGuards(JwtAuthGuard, RolesGuard)
    export class ProyectoController {
        constructor(private proyectoService: ProyectoService) {}

        @Post(":idConvocatoria")
        @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
        @ApiOperation({ summary: 'Crear un nuevo proyecto' })
        @ApiParam({ name: 'idConvocatoria', required: true, description: 'ID de la convocatoria asociada al proyecto' })
        @ApiBody({ type: CreateProyectoDTO })
        @ApiCreatedResponse(Proyecto, "Postulación creada correctamente")
        @ApiCommonResponses()
        @ApiNotFoundResponse()
        async createProyecto(
            @Param('idConvocatoria') idConvocatoria: string,
            @Body(new ValidationPipe({ transform: true })) proyecto: CreateProyectoDTO,
        ) {
            //console.log('Proyecto recibido:', JSON.stringify(proyecto, null, 2));
            return this.proyectoService.createProyecto(idConvocatoria, proyecto);
        }
        
        @Get()
        @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
        @ApiOperation({ summary: 'Obtener todos los proyectos' })
        @ApiSuccessResponse([Proyecto], "Proyectos encontrados")
        @ApiCommonResponses()
        @ApiNotFoundResponse()
        async getProyectos() {
            console.log(' GET /proyecto recibido');
            return this.proyectoService.getAllProyectos();
        }

        @Get(':id')
        @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
        @ApiOperation({ summary: 'Obtener un proyecto por ID' })
        @ApiParam({ name: 'id', description: 'ID del proyecto' })
        @ApiSuccessResponse([Proyecto], "Proyecto encontrado")
        @ApiCommonResponses()
        @ApiNotFoundResponse()
        async getProyecto(@Param('id') id: string) {
            return this.proyectoService.getProyectoById(id);
        }   

        @Get('/convocatoria/:idConvocatoria')
        @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
        @ApiOperation({ summary: 'Obtener todos los proyectos de una convocatoria' })
        @ApiParam({ name: 'idConvocatoria', required: true, description: 'ID de la convocatoria' })
        @ApiSuccessResponse([Proyecto], "Proyectos encontrados")
        @ApiCommonResponses()
        @ApiNotFoundResponse()
        async getProyectosByConvocatoria(@Param('idConvocatoria') idConvocatoria: string) {
            return this.proyectoService.getProyectosByConvocatoria(idConvocatoria);
        }

    }
