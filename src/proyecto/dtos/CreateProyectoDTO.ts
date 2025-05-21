
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class GastoDTO {
    @ApiProperty({ example: 'Computadora' })
    @IsString()
    @IsNotEmpty()
    rubro: string;

    @ApiProperty({ example: 'Compra de laptop para investigación' })
    @IsString()
    descripcion: string;

    @ApiProperty({ example: 200000 })
    @Type(() => Number)
    @IsNumber()
    coste: number;
}

class PresupuestoDTO {
    @ApiProperty({ type: [GastoDTO], example: [{ rubro: 'Computadora', descripcion: 'Compra de laptop', coste: 200000 }] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GastoDTO)
    gastosCapital: GastoDTO[];

    @ApiProperty({ type: [GastoDTO], example: [{ rubro: 'Servicio de internet', descripcion: 'Pago mensual', coste: 5000 }] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GastoDTO)
    gastosCorrientes: GastoDTO[];
}

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
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Título del proyecto' })
    titulo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Categoría del proyecto' })
    categoria: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Objetivos del proyecto' })
    objetivos: string;
    
/*
    @IsOptional()
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
*/ 
    // A Definir la estructura para guardar el presupuesto
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PresupuestoDTO)
    @ApiProperty({
        type: PresupuestoDTO,
        description: 'Presupuesto detallado del proyecto',
    })
    presupuesto: PresupuestoDTO;
    
}