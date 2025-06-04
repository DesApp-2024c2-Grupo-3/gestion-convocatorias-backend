// src/autenticacion/dtos/RegisterDTO.ts
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({ 
        description: 'Nombre completo del usuario', 
        example: 'Juan Pérez', 
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    nombre: string;

    @ApiProperty({ 
        description: 'Correo electrónico del usuario', 
        example: 'usuario@example.com', 
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    email: string;
  
    @ApiProperty({ 
        description: 'Contraseña del usuario',
        example: 'tuContraseña123',
        required: true,
        minLength: 3
    })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim()) 
    password: string;
}