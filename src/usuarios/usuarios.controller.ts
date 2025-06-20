import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdatePasswordDTO } from './dtos/UpdatePasswordDTO';
import { HasRoles } from '@/auth/decorators/has-roles.decorator';
import { UpdateRolesDTO } from './dtos/UpdateRolesDTO';
import { ROLES } from '@/common/constants/roles';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Usuario } from './usuarios.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiSuccessResponse, ApiCreatedResponse,ApiCommonResponses, ApiNotFoundResponse } from '../common/decorators/api-response.decorator';

@ApiTags('Usuarios')
@ApiBearerAuth('access-token')
@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {

    constructor(
        private readonly usuarioService:UsuariosService
    ){}

    @Get()
    @HasRoles(ROLES.SUPER_ADMIN)
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiSuccessResponse([Usuario], "Usuarios encontrados")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    obtenerUsuarios(){
        return this.usuarioService.obtenerUsuarios()
    }

    @Get(':id')
    @HasRoles(ROLES.SUPER_ADMIN)
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario a obtener' })
    @ApiSuccessResponse(Usuario, "Usuario encontrado")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    obtenerUsuario(@Param('id') id:string){
        return this.usuarioService.obtenerUsuario(id)
    }

    @Delete(':email')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Da de baja un usuario por email' })
    @ApiParam({ name: 'email', description: 'Email del usuario a dar de baja' })
    @ApiSuccessResponse(Usuario, "Proyectos encontrados")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    async eliminarUsuario(@Param('email') email:string){
        return this.usuarioService.eliminarUsuario(email) 
    }

    @Patch(':email')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Actualizar contrasenia de un usuario por email' })
    @ApiParam({ name: 'email', description: 'Email del usuario a actualizar' })
    @ApiSuccessResponse(Usuario, "Contraseña actualizada correctamente")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    @ApiBody({ type: UpdatePasswordDTO})
    async updateContrasenia(
        @Body() updatePasswordDto: UpdatePasswordDTO,
        @Param('email') email: string
    ){
        return this.usuarioService.updateContrasenia(email, updatePasswordDto);
    }

    @Patch('roles/:email')
    @HasRoles(ROLES.SUPER_ADMIN)
    @ApiOperation({ summary: 'Actualizar roles de un usuario por email' })
    @ApiParam({ name: 'email', description: 'Email del usuario a actualizar' })
    @ApiSuccessResponse(Usuario, "Roles actualizados correctamente")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    @ApiBody({ type: UpdateRolesDTO})
    async updateRoles(
        @Body() updateRolesDto: UpdateRolesDTO,
        @Param('email') email: string
    ){
        return this.usuarioService.updateRoles(email, updateRolesDto);
    }

    @Put('cv')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Actualizar CV de usuario' })
    @ApiSuccessResponse(Usuario, "CV actualizado correctamente")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    @UseInterceptors(FileInterceptor('archivo'))
    async updateCv(
        @Body("email") email:string, //body: {email:string , archivo: Express.Multer.File},
        @UploadedFile() archivo: Express.Multer.File
    ){
        return this.usuarioService.updateCv(email, archivo);
    }

    @Get('cv/download/:id')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Descargar CV de usuario' })
    @ApiSuccessResponse([Usuario], "CV descargado correctamente")
    @ApiCommonResponses()
    @ApiNotFoundResponse()
    async downloadCv(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const usuario = await this.usuarioService.obtenerUsuario(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        if (!usuario.cv || !usuario.cv.contenido) {
            throw new NotFoundException('El usuario no tiene un CV cargado');
        }

        res.set({
            'Content-Type': usuario.cv.tipo,
            'Content-Disposition': `attachment; filename="${usuario.cv.nombre}"`,
        });

        return res.send(usuario.cv.contenido);
    }
}
