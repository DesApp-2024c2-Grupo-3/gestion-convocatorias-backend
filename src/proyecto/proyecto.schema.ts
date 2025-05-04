import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type ProyectoDocument = HydratedDocument<Proyecto>;

@Schema()
@ApiSchema({ description: 'Schema que define la estructura de los documentos de la coleccion "Proyectos"' })
export class Proyecto {
    @Prop({ required: true })
    @ApiProperty({
        description: 'ID del autor del proyecto',
        example: '67e5c338e4a7ddc1b25733ff',
        type: String,
        required: true,
    })
    autor: string;

    @Prop()
    @ApiProperty({
        description: 'Lista de IDs de los usuarios que aceptaron la invitación al proyecto',
        example: ['67e5c338e4a7ddc1b25733ff', '67e5c338e4a7ddc1b25733fg'],
        type: [String],
        default: []
    })
    miembros: string[];

    @Prop({ required: true })
    @ApiProperty({
        description: 'Lista con las direcciones de correo electrónico de los usuarios invitados al proyecto',
        example: ['invitado1@gmail.com','invitado2@gmail.com'],
        type: [String],
        required: true,
        default: []
    })
    invitados: string[];
    
    @Prop({ required: true })
    @ApiProperty({
        description: 'Datos del proyecto',
        example: [
            {
            nombreDelCampo: 'Nombre del proyecto',
            dato: 'Proyecto de prueba'

            },
            {
            nombreDelCampo: 'Descripción del proyecto',
            dato: 'Descripción del proyecto de prueba'
            }
        ],
        type: [Object],
        required: true,
    })
    planDeTrabajo: [{
        nombreDelCampo: string,
        dato: string,
    }]

    // A Definir la estructura para guardar el presupuesto
    @Prop({ type: Object })
    @ApiProperty({
        description: 'Presupuesto del proyecto',
    })
    presupuesto: any;
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);