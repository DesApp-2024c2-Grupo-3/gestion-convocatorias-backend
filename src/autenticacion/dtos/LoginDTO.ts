import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ValidationMessages } from "src/common/constants/validation-message";

const minLengthPassword = 3;
export class LoginDTO {
    @ApiProperty({ 
        description: 'Correo electrónico del usuario', 
        example: 'usuario@example.com', 
        required: true
    })
    @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID })
    @IsNotEmpty({ message: ValidationMessages.REQUIRED })
    email: string;
  
    @ApiProperty({ 
        description: 'Contraseña del usuario',
        example: 'tuContraseña123',
        required: true,
        minLength: minLengthPassword
    })
    @IsString({ message: ValidationMessages.STRING.INVALID })
    @MinLength(minLengthPassword, { message: ValidationMessages.PASSWORD.MIN_LENGTH })
    @IsNotEmpty({ message: ValidationMessages.REQUIRED })
    @Transform(({ value }) => value.trim()) 
    password: string;
  } 