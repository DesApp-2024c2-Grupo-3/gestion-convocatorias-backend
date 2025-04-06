import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  @Prop({ required: true }) 
  nombre: string;

  @Prop({ required: true, unique: true }) 
  email: string;

  @Prop({ required: true }) 
  password: string;

  @Prop({
    type: {
        nombre: String,
        tipo: String,
        contenido: Buffer,
    }
  })
  cv: { nombre: string; tipo: string; contenido: Buffer };
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);