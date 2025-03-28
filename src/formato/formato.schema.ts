import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormatoDocument = HydratedDocument<Formato>;

@Schema()
export class Formato {

    @Prop({ required: true })
    nombreDelFormato: string;

    @Prop(raw([{
        nombreDelCampo: { type: String, required: true },
        tipo: { type: String, enum: ['texto', 'selector'], required: true },
        maxNumeroDeCaracteres: { type: Number },
        opciones: { type: [String] }
    }]))
    campos: Array<{
        nombreDelCampo: string;
        tipo: 'texto' | 'selector';
        maxNumeroDeCaracteres?: number;
        opciones?: string[];
    }>;

}

export const FormatoSchema = SchemaFactory.createForClass(Formato);
