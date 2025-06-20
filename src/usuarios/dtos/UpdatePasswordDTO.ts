import { PickType } from "@nestjs/swagger";
import { RegisterDTO } from "@/autenticacion/dtos/RegisterDTO";

export class UpdatePasswordDTO extends PickType(RegisterDTO, ['password'] as const) {}