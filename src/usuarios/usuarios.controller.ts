import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { LoginDTO } from './dtos/LoginDTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePasswordDTO } from './dtos/UpdatePasswordDTO';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuariosController {

    constructor(
        private readonly usuarioService:UsuariosService
    ){}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO){
        return this.usuarioService.createUser(createUserDTO);
    }

    // Pasar a nuevo modulo
    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión de usuario' })
    @ApiResponse({ 
        status: 200, 
        description: 'Login exitoso',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                usuario: {
                    id: '1234',
                    email: 'usuario@example.com',
                    nombre: 'Usuario',
                    roles: ['INVESTIGADOR']
                }
            }
        }
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Credenciales incorrectas' 
    })
    login(@Body() loginDto:LoginDTO){
        const {email, password} = loginDto
        return this.usuarioService.loginUser(email, password)
    }

    //Pasar a nuevo modulo
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

    @Delete(':email')
    async eliminarUsuario(@Param('email') email:string){
        return this.usuarioService.eliminarUsuario(email) 
    }

    @Patch(':email')
    async updateContrasenia(
        @Body() updatePasswordDto: UpdatePasswordDTO,
        @Param('email') email: string
    ){
        return this.usuarioService.updateContrasenia(email, updatePasswordDto);
    }

}
