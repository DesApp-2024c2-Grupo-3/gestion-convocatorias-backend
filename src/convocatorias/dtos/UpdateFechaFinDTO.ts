import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class UpdateFechaFinDto {
    @Type(() => Date)
    @IsDate()
    fechaFin: Date;
}