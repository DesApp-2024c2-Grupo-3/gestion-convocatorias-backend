import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateProyectoDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID del autor del proyecto',
        example: '67e5c338e4a7ddc1b25733ff',
        type: String,
        required: true,
    })
    autor: string;

    @IsArray()
    @IsString({ each: true })
    @ApiProperty({
        description: 'Lista con las direcciones de correo electrónico de los usuarios invitados al proyecto',
        example: ['invitado1@gmail.com','invitado2@gmail.com'],
        type: [String], 
        required: true,
    })
    invitados: string[];

    @IsArray()
    @IsNotEmpty()
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
        nombreDelCampo: string;
        dato: string;
    }];

    // A Definir la estructura para guardar el presupuesto
    presupuesto: any;
}