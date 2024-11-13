import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type ConvocatoriasDocument = HydratedDocument<Convocatorias>


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

export const informacionGeneralSchema = SchemaFactory.createForClass(InformacionGeneral);

@Schema({ discriminatorKey: 'tipo' })
export class FormatoTexto {
    @Prop()
    nombre: string;
    
    @Prop()
    tipo: "Texto";
    
    @Prop()
    maxNumeroDeCaracteres: number;
}

export const formatoTextoSchema = SchemaFactory.createForClass(FormatoTexto);


@Schema({ discriminatorKey: 'tipo' })
export class FormatoDesplegable {
    @Prop()
    nombre: string;
    
    @Prop()
    tipo: "Desplegable";
    
    @Prop([String])
    opciones: string[];
}

export const formatoDesplegableSchema = SchemaFactory.createForClass(FormatoDesplegable);

@Schema()
export class Convocatorias {

    @Prop({ type: informacionGeneralSchema, required: true})
    informacionGeneral: InformacionGeneral

    @Prop( {type: [formatoTextoSchema || formatoDesplegableSchema]})
    formato: (FormatoTexto | FormatoDesplegable)[]

}
export const ConvocatoriasSchema = SchemaFactory.createForClass(Convocatorias)