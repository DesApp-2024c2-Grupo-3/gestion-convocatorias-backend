// src/autenticacion/dtos/RegisterDTO.ts
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ValidationMessages } from "src/common/constants/validation-message";

const minLengthPassword = 3;
export class RegisterDTO {
    @ApiProperty({ 
        description: 'Nombre completo del usuario', 
        example: 'Juan Pérez', 
        required: true
    })
    @IsString({ message: ValidationMessages.STRING.INVALID })
    @IsNotEmpty({ message: ValidationMessages.REQUIRED })
    @Transform(({ value }) => value.trim())
    nombre: string;

    @ApiProperty({ 
        description: 'Correo electrónico del usuario', 
        example: 'usuario@example.com', 
        required: true
    })
    @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID })
    @IsNotEmpty({ message: ValidationMessages.REQUIRED })
    @Transform(({ value }) => value.trim())
    email: string;
  
    @ApiProperty({ 
        description: 'Contraseña del usuario',
        example: 'tuContraseña123',
        required: true,
        minLength: 3
    })
    @IsString()
    @MinLength(minLengthPassword, { message: ValidationMessages.PASSWORD.MIN_LENGTH })
    @IsNotEmpty({ message: ValidationMessages.REQUIRED })
    @Transform(({ value }) => value.trim()) 
    password: string;
}