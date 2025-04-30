import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Formato, FormatoSchema } from 'src/formato/formato.schema';

export type ConvocatoriasDocument = HydratedDocument<Convocatoria>;

@Schema()
export class Convocatoria {
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin: Date;

  @Prop(FormatoSchema)
  formato: Formato

  @Prop({
    type: {
        nombre: String,
        tipo: String,
        contenido: Buffer,
    }
  })
  archivo: { nombre: string; tipo: string; contenido: Buffer };

  @Prop()
  baja: Boolean
}

export const ConvocatoriaSchema = SchemaFactory.createForClass(Convocatoria);

export type ConvocatoriaDocumentOverride = {
    name: Types.Subdocument<Types.ObjectId> & Formato;
};

export type ConvocatoriaDocument = HydratedDocument<Convocatoria, ConvocatoriaDocumentOverride>