import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class UserDTO {


    @MinLength(3, {message: 'nombre: longitud minima de 3'})
    nombre: string;
    
    @IsEmail()
    email: string;
  
    @IsNotEmpty({message: 'La contraseña del usuario no puede estar vacia'})
    @MinLength(8, {message: 'nombre: longitud minima de 3'})
    @Transform(({ value }) => value.trim()) 
    password: string;
  
  }