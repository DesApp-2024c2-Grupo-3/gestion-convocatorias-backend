import { IsString, IsArray, IsOptional, IsEnum, IsNumber } from 'class-validator';

class CampoTextoDto {
    @IsString()
    nombreDelCampo: string;

    @IsEnum(['texto'])
    tipo: 'texto';

    @IsNumber()
    maxNumeroDeCaracteres: number;
}

class CampoDesplegableDto {
    @IsString()
    nombreDelCampo: string;

    @IsEnum(['selector'])
    tipo: 'selector';

    @IsArray()
    opciones: string[];
}

export class CreateFormatoDto {
    @IsString()
    nombreDelFormato: string;

    @IsArray()
    campos: (CampoTextoDto | CampoDesplegableDto)[];
}
