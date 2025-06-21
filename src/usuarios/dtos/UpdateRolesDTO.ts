import { IsString } from "class-validator";
import { ApiProperty, ApiSchema } from "@nestjs/swagger"

@ApiSchema({ description: "DTO para actualizar rol de usuario" })
export class UpdateRolesDTO {
    @IsString({each: true})
    @ApiProperty({
        description: "Rol del usuario",
        example: "investigador/admin/super_admin",
        required: true
    })
    readonly roles: string[]
}