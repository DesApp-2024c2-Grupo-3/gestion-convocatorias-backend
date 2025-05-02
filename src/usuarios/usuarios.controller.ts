import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { LoginDTO } from '../autenticacion/dtos/LoginDTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePasswordDTO } from './dtos/UpdatePasswordDTO';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { ROLES } from 'src/constants/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Usuarios')
@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {

    constructor(
        private readonly usuarioService:UsuariosService
    ){}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO){
        return this.usuarioService.createUser(createUserDTO);
    }

    @Get()
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    obtenerUsuarios(){
        return this.usuarioService.obtenerUsuarios()
    }

    @Get(':id')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
    obtenerUsuario(@Param('id') id:string){
        return this.usuarioService.obtenerUsuario(id)
    }

    @Delete(':email')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    async eliminarUsuario(@Param('email') email:string){
        return this.usuarioService.eliminarUsuario(email) 
    }

    @Patch(':email')
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    async updateContrasenia(
        @Body() updatePasswordDto: UpdatePasswordDTO,
        @Param('email') email: string
    ){
        return this.usuarioService.updateContrasenia(email, updatePasswordDto);
    }

}
