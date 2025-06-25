import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationMessages } from "@/common/constants/validation-message";

export class RecoverPasswordDTO {
  @ApiProperty({
    description: 'Email del usuario para recuperar contraseña',
    example: 'usuario@ejemplo.com'
  })
  @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  email: string;
}