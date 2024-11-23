import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './usuarios.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dtos/UserDTO';
import { LoginDTO } from './dtos/LoginDTO';
import { Convocatorias } from 'src/convocatorias/convocatorias.schema';
import { ConvocatoriasModule } from 'src/convocatorias/convocatorias.module';
import { ConvocatoriasService } from 'src/convocatorias/convocatorias.service';



@Injectable()
export class UsuariosService {

    constructor(@InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
                private readonly convocatoriaService:ConvocatoriasService) {}



    async obtenerUsuarios(): Promise<Usuario[]> {
        return await this.usuarioModel.find().exec()
    }


    
    async obtenerUsuario(id:string): Promise<Usuario> {
        const usuarioExistente = await this.usuarioModel.findById(id).exec()

        if(!usuarioExistente){
            throw new BadRequestException("No existe el usuario con id buscado")
        }

        return usuarioExistente

    }



    async createUser(usuarioDto: UserDTO): Promise<UserDTO> {
        const usuarioExistente = await this.usuarioModel.findOne({ email: usuarioDto.email }).exec();

        if (usuarioExistente) {
          throw new BadRequestException(`El usuario con email ${usuarioDto.email} ya existe`);
        }
      
        const nuevoUsuario = new this.usuarioModel(usuarioDto);
        return nuevoUsuario.save(); 
    }

    
    // psoiblemente no sea necesario
    async eliminarUsuario(id:string){
        const usuarioExistente = await this.usuarioModel.findById(id).exec()

        if(!usuarioExistente){
            throw new BadRequestException("El usuario con id no existe")
        }

        await this.usuarioModel.findByIdAndDelete(id).exec();
    }



    async login(loginDto:LoginDTO): Promise<{message:string; loginDto:LoginDTO}> {
        const usuarioExistente = await this.usuarioModel.findOne({ email: loginDto.email }).exec();

        if(!usuarioExistente){
            throw new BadRequestException("El email no es de un usuario registrado")
        }

        if (loginDto.password !== usuarioExistente.password) {
            throw new BadRequestException('La contraseña es incorrecta');
        }

        return {
            message: 'Inicio de sesión exitoso',
            loginDto: loginDto,
        };
    }


}
