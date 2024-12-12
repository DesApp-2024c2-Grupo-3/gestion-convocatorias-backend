import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ConvocatoriasDocument = HydratedDocument<Convocatorias>;

@Schema()
export class InformacionGeneral {
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin: Date;
}

export const informacionGeneralSchema =
  SchemaFactory.createForClass(InformacionGeneral);

@Schema({ discriminatorKey: 'tipo', _id: false })
export class FormatoBase {
  @Prop()
  nombre: string;

  @Prop()
  tipo: string;
}

export const formatoBaseSchema = SchemaFactory.createForClass(FormatoBase);

@Schema({ _id: false })
export class FormatoTexto {
  @Prop()
  maxNumeroDeCaracteres: number;
}

export const formatoTextoSchema = SchemaFactory.createForClass(FormatoTexto);

@Schema({ _id: false })
export class FormatoDesplegable {
  @Prop([String])
  opciones: string[];
}

export const formatoDesplegableSchema =
  SchemaFactory.createForClass(FormatoDesplegable);

@Schema()
export class Convocatorias {
  @Prop({ type: informacionGeneralSchema, required: true })
  informacionGeneral: InformacionGeneral;

  @Prop({
    type: [formatoBaseSchema],
    required: true,
    default: [],
  })
  formato: Types.DocumentArray<FormatoBase>;
}

export const ConvocatoriasSchema = SchemaFactory.createForClass(Convocatorias);


formatoBaseSchema.discriminator('Texto', formatoTextoSchema);
formatoBaseSchema.discriminator('Desplegable', formatoDesplegableSchema);
