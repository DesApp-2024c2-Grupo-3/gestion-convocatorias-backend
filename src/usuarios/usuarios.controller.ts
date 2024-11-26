import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { LoginDTO } from './dtos/LoginDTO';

@Controller('usuario')
export class UsuariosController {

    constructor(
        private readonly usuarioService:UsuariosService
    ){}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO){
        return this.usuarioService.createUser(createUserDTO);
    }

    @Post('login')
    login(@Body() loginDto:LoginDTO){
        const {email, password} = loginDto
        return this.usuarioService.loginUser(email, password)
    }

    @Post('refresh')
    refreshToken(@Req() request: Request ){
        const [type, token] = request.headers['authorization']?.split(' ') || []
        return this.usuarioService.refreshToken(token);
    }

    @Get()
    obtenerUsuarios(){
        return this.usuarioService.obtenerUsuarios()
    }

    @Get(':id')
    obtenerUsuario(@Param('id') id:string){
        return this.usuarioService.obtenerUsuario(id)
    }

    @Delete(':id')
    async eliminarUsuario(@Param('id') id:string){
        return this.usuarioService.eliminarUsuario(id) 
    }
}
