import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConvocatoriaDto {
  @ApiProperty({ 
    description: 'Título de la convocatoria', 
    example: 'Convocatoria de prueba' 
  })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ 
    description: 'Descripción de la convocatoria', 
    example: 'Convocatoria de prueba' 
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ 
    description: 'Fecha de inicio de la convocatoria', 
    example: '2024-01-01' 
  })
  @IsNotEmpty()
  fechaInicio: Date;

  @ApiProperty({ 
    description: 'Fecha de fin de la convocatoria', 
    example: '2024-01-01' 
  })
  @IsNotEmpty()
  fechaFin: Date;

  @ApiProperty({ 
    description: 'Formato de la convocatoria', 
    example: 'Convocatoria de prueba' 
  })
  @IsNotEmpty()
  @IsString()
  formato: string;
}
