import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { LoginDTO } from './dtos/LoginDTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePasswordDTO } from './dtos/UpdatePasswordDTO';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { ROLES } from 'src/constants/roles';

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
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
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
    @HasRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR)
    @Post('refresh')
    refreshToken(@Req() request: Request ){
        const [type, token] = request.headers['authorization']?.split(' ') || []
        return this.usuarioService.refreshToken(token);
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
