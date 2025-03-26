import { IsDate, IsObject, isObject, IsOptional, IsString } from "class-validator";

class Info {
    @IsString()
    @IsOptional()
    titulo?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsDate()
    @IsOptional()
    fechaInicio?: Date;

    @IsDate()
    @IsOptional()
    fechaFin?: Date;
}


class FormT {
        
        @IsOptional()
        nombre?: string;

        @IsOptional()
        tipo?: 'Texto';

        @IsOptional()
        maxNumeroDeCaracteres?: number;
}

class FormD {
    @IsOptional()
    nombre?: string;
  
    @IsOptional()
    tipo?: 'Desplegable';
  
    @IsOptional()
    opciones?: string[];
  }

export class updateConvocatoriaDTO {
    @IsOptional()
    informacionGeneral: Info
    @IsOptional()
    formato: (FormT|FormD)[]
}