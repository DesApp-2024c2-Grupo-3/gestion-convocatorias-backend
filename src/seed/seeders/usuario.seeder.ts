import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '@/usuarios/usuarios.schema';
import { usuariosData } from '@/seed/data/usuarios.data';
import { SeederUtils } from '@/seed/utils/seeder.utils';

export class UsuarioSeeder {
  private usuarioModel: Model<Usuario>;
  private utils: SeederUtils;

  constructor(private app: INestApplicationContext) {
    this.usuarioModel = app.get<Model<Usuario>>(getModelToken(Usuario.name));
    this.utils = new SeederUtils();
  }

  async seed(): Promise<void> {
    await this.usuarioModel.deleteMany({});


    for (const usuarioData of usuariosData) {
      const usuarioExistente = await this.usuarioModel.findOne({ 
        email: usuarioData.email 
      });
      
      if (usuarioExistente) {
        console.log(`✅ Usuario ${usuarioData.email} ya existe`);
        continue;
      }

      const hashedPassword = await this.utils.hashPassword(usuarioData.password);
      
      const nuevoUsuario = new this.usuarioModel({
        ...usuarioData,
        password: hashedPassword,
        baja: false,
        cv: null
      });
      
      await nuevoUsuario.save();
      console.log(`✅ Usuario ${usuarioData.email} creado exitosamente`);
    }
  }
}