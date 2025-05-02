import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsArray, IsString, IsNotEmpty } from "class-validator";
import { CreateConvocatoriaDto } from "./CreateConvocatoriaDTO";

export class UpdateConvocatoriaDTO extends PartialType(CreateConvocatoriaDto) {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    proyectos?: string[];
}