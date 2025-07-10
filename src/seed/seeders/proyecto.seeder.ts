import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '@/usuarios/usuarios.schema';
import { Proyecto } from '@/proyecto/proyecto.schema';
import { usuariosData } from '@/seed/data/usuarios.data';
import { proyectosData } from '@/seed/data/proyectos.data';
import { Convocatoria } from '@/convocatorias/convocatoria.schema';
import { ConvocatoriasService } from '@/convocatorias/convocatoria.service';


export class ProyectoSeeder {
  private usuarioModel: Model<Usuario>;
  private proyectoModel: Model<Proyecto>;
  private convocatoriaModel: Model<Convocatoria>;
  private convocatoriaService: ConvocatoriasService;

  constructor(private app: INestApplicationContext) {
    this.usuarioModel = app.get<Model<Usuario>>(getModelToken(Usuario.name));
    this.proyectoModel = app.get<Model<Proyecto>>(getModelToken(Proyecto.name));
    this.convocatoriaModel = app.get<Model<Convocatoria>>(getModelToken(Convocatoria.name));
    this.convocatoriaService = app.get<ConvocatoriasService>(ConvocatoriasService);
  }

  async seed(): Promise<void> {
    await this.proyectoModel.deleteMany({});
    console.log('🗑️ Todos los proyectos anteriores eliminados.');


    const todasLasConvocatorias = await this.convocatoriaModel.find({}).select("-archivo");
    if (todasLasConvocatorias.length === 0) {
      console.log('❌ No hay convocatorias disponibles');
      return;
    }

    for (const proyectoData of proyectosData) {

      const nuevoProyecto = new this.proyectoModel({
        ...proyectoData,
        autor: usuariosData[2].email,
      });
      const proyectoCreado = await nuevoProyecto.save();
      const idProyecto = proyectoCreado._id.toString();

      const convocatoriaAleatoria = todasLasConvocatorias[Math.floor(Math.random() * todasLasConvocatorias.length)];

      await this.convocatoriaService.updateConvocatoria(
        convocatoriaAleatoria._id.toString(),
        { proyectos: [idProyecto] },
      );
      
      console.log(`✅ Proyecto creado por ${usuariosData[2].email}`);
    }
  }
}