import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '@/usuarios/usuarios.schema';
import { Proyecto } from '@/proyecto/proyecto.schema';
import { usuariosData } from '@/seed/data/usuarios.data';
import { proyectosData } from '@/seed/data/proyectos.data';

export class ProyectoSeeder {
  private usuarioModel: Model<Usuario>;
  private proyectoModel: Model<Proyecto>;

  constructor(private app: INestApplicationContext) {
    this.usuarioModel = app.get<Model<Usuario>>(getModelToken(Usuario.name));
    this.proyectoModel = app.get<Model<Proyecto>>(getModelToken(Proyecto.name));
  }

  async seed(): Promise<void> {
    await this.proyectoModel.deleteMany({});
    console.log('🗑️ Todos los proyectos anteriores eliminados.');

    const usuario = await this.usuarioModel.findOne({ email: usuariosData[2].email });
    if (!usuario) {
      console.log(`❌ Usuario con email ${usuariosData[2].email} no encontrado`);
    }

    for (const proyectoData of proyectosData) {

      const nuevoProyecto = new this.proyectoModel({
        ...proyectoData,
        autor: usuario._id,
      });
      await nuevoProyecto.save();
      console.log(`✅ Proyecto creado por ${usuario.email}`);
    }
  }
}