import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDTO {

    @IsString()
    readonly nombre: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsNotEmpty({message: 'La contraseña del usuario no puede estar vacia'})
    @MinLength(3)
    readonly password: string;
  
  }