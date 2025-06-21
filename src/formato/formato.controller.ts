import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FormatoService } from '@/formato/formato.service';
import { Formato } from '@/formato/formato.schema';
import { CreateFormatoDto } from '@/formato/dtos/CreateFormatoDTO';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { HasRoles } from '@/auth/decorators/has-roles.decorator';
import { ROLES } from '@/common/constants/roles';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse, ApiCreatedResponse,ApiCommonResponses, ApiNotFoundResponse } from '@/common/decorators/api-response.decorator';

@ApiTags('Formato')
@ApiBearerAuth('access-token')
@Controller('formato')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FormatoController {
    constructor(private formatoService: FormatoService) {}

    @Get()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    @ApiOperation({ summary: 'Obtener todos los formatos' })
    @ApiSuccessResponse([Formato], "Formatos encontrados")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    async get(): Promise<Formato[]> {
        return this.formatoService.getAllFormatos();
    }

    @Get(':id')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Obtener un formato por ID' })
    @ApiParam({ name: 'id', description: 'ID del formato a obtener' })
    @ApiSuccessResponse(Formato, "Formato encontrado")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    async getFormatoById(@Param('id') id: string): Promise<Formato> {
        return this.formatoService.getFormatoById(id);
    }

    @Post()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    @ApiOperation({ summary: 'Crear un nuevo formato' })
    @ApiBody({ type: CreateFormatoDto })
    @ApiCreatedResponse(Formato, "Formato creado correctamente")
    @ApiCommonResponses()
    async create (@Body() formato: CreateFormatoDto) {
        return this.formatoService.createFormato(formato)
    }
}
