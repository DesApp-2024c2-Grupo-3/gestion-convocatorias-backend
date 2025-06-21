import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsObject, ValidateIf} from 'class-validator';
import { Transform } from 'class-transformer';
import { ValidationMessages } from "src/common/constants/validation-message";


export class SendEmailDTO {

  @ApiProperty({ 
    description: 'El correo electrónico del remitente', 
    example: '',
    required: false
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID })
  fromEmail: string;

  @ApiProperty({ 
    description: 'El correo electrónico del destinatario', 
    example: 'usuario@example.com',
    required: true
  })
  @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  toEmail: string;
  
  @ApiProperty({ 
    description: 'El nombre del destinatario', 
    example: 'Juan Pérez',
    required: true
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsString({ message: ValidationMessages.STRING.INVALID })
  toName: string;

  @ApiPropertyOptional({ 
    description: 'El asunto del correo', 
    example: '¡Bienvenido a la Plataforma de Convocatorias!',
    required: false
  })
  @ValidateIf(o => !o.type)
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsString({ message: ValidationMessages.STRING.INVALID })
  subject?: string;

  @ApiPropertyOptional({ 
    description: 'El tipo de correo electrónico a enviar (registro_exitoso, invitacion_grupo_convocatoria)',
    example: 'registro_exitoso',
    required: true
  })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @IsString({ message: ValidationMessages.STRING.INVALID })
  type?: string;

  @ApiPropertyOptional({ 
    description: 'Las variables a reemplazar en el correo (variables: {userEmail, name})',
    example: { userEmail: 'destinatario.prueba@ejemplo.com', name: 'Juan Pérez' },
    required: false
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsObject({ message: ValidationMessages.OBJECT.INVALID })
  variables?: Record<string, any>;
}