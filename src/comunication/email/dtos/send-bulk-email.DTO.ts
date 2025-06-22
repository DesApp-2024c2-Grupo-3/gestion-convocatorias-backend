import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SendEmailDTO } from './send-email.DTO';

export class SendBulkEmailDTO {
  @ApiProperty({ 
    description: 'Lista de correos a enviar', 
    type: [SendEmailDTO],
    required: true
  })
  @IsArray({ message: 'Debe ser un array de correos' })
  @ArrayMinSize(1, { message: 'Debe tener al menos un correo' })
  @ValidateNested({ each: true, message: 'Cada elemento del array debe ser un correo válido' }) 
  @Type(() => SendEmailDTO)
  emails: SendEmailDTO[];
}