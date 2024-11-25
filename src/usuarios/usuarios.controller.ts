import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.schema';
import { UserDTO } from './dtos/UserDTO';
import { LoginDTO } from './dtos/LoginDTO';
import { Convocatorias } from 'src/convocatorias/convocatorias.schema';
import { ConvocatoriasService } from 'src/convocatorias/convocatorias.service';


@Controller('usuario')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Get()
  obtenerUsuarios() {
    return this.usuarioService.obtenerUsuarios();
  }

  @Get(':id')
  obtenerUsuario(@Param('id') id: string) {
    return this.usuarioService.obtenerUsuario(id);
  }

  @Post('registro')
  createUser(@Body() usuarioDto: UserDTO) {
    return this.usuarioService.createUser(usuarioDto);
  }

  @Delete(':id')
  async eliminarUsurio(@Param('id') id: string) {
    return this.usuarioService.eliminarUsuario(id);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.usuarioService.login(loginDTO);
  }
}
