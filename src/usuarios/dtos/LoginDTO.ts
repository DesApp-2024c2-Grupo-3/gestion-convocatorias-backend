import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim()) 
    password: string;
  }