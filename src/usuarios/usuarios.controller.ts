import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdatePasswordDTO } from './dtos/UpdatePasswordDTO';
import { UpdateRolesDTO } from './dtos/UpdateRolesDTO';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { ROLES } from 'src/constants/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Usuario } from './usuarios.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Usuarios')
@ApiBearerAuth('access-token')
@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {

    constructor(
        private readonly usuarioService:UsuariosService
    ){}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Error al crear el usuario' })
    @ApiBody({ type: CreateUserDTO })
    create(@Body() createUserDTO: CreateUserDTO){
        return this.usuarioService.createUser(createUserDTO);
    }

    @Get()
    @HasRoles(ROLES.SUPER_ADMIN)
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [Usuario] })
    @ApiResponse({ status: 400, description: 'Error al obtener los usuarios' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos para acceder a los usuarios' })
    obtenerUsuarios(){
        return this.usuarioService.obtenerUsuarios()
    }

    @Get(':id')
    @HasRoles(ROLES.SUPER_ADMIN)
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario a obtener' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario })
    @ApiResponse({ status: 400, description: 'ID inválido' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No tiene permisos para acceder a los usuarios' })
    obtenerUsuario(@Param('id') id:string){
        return this.usuarioService.obtenerUsuario(id)
    }

    @Delete(':email')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Da de baja un usuario por email' })
    @ApiParam({ name: 'email', description: 'Email del usuario a dar de baja' })
    @ApiResponse({ status: 200, description: 'Usuario dado de baja' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async eliminarUsuario(@Param('email') email:string){
        return this.usuarioService.eliminarUsuario(email) 
    }

    @Patch(':email')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @ApiOperation({ summary: 'Actualizar contraseña de un usuario por email' })
    @ApiParam({ name: 'email', description: 'Email del usuario a actualizar' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
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
    @ApiResponse({ status: 200, description: 'Rol de usuario actualizado' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
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
    @ApiResponse({ status: 200, description: 'CV de usuario actualizado' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @UseInterceptors(FileInterceptor('archivo'))
    async updateCv(
        @Body("email") email:string, //body: {email:string , archivo: Express.Multer.File},
        @UploadedFile() archivo: Express.Multer.File
    ){
        return this.usuarioService.updateCv(email, archivo);
    }
}
