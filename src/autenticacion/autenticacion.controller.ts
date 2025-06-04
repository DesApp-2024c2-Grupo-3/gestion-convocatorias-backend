import { Body, Controller, Post, Req } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDTO } from './dtos/LoginDTO';
import { RegisterDTO } from './dtos/RegisterDTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al registrar usuario' })
  register(@Body() registerDTO: RegisterDTO) {
    const { nombre, email, password } = registerDTO;
    return this.autenticacionService.register(nombre, email, password);
}


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
          roles: ['INVESTIGADOR'],
        },
      },
    },
  })
  
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  login(@Body() loginDto: LoginDTO) {
    const { email, password } = loginDto;
    return this.autenticacionService.login(email, password);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token' })
  refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return this.autenticacionService.refreshToken(token);
  }
}