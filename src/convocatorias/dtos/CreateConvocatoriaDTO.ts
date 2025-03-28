import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConvocatoriaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  fechaInicio: Date;

  @IsNotEmpty()
  fechaFin: Date;

  @IsNotEmpty()
  @IsString()
  formato: string;
}
