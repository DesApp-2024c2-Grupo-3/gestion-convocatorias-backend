import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '@/comunication/email/email.service';
import { SendEmailDTO } from '@/comunication/email/dtos/send-email.DTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiSuccessResponse, ApiCommonResponses } from '@/common/decorators/api-response.decorator';

@ApiTags('Comunicación')
@Controller('comunicacion')
export class ComunicacionController {
  constructor(private readonly emailService: EmailService) {}

  @Post('enviar-correo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Envía un correo electrónico' })
  @ApiBody({ type: SendEmailDTO })
  @ApiSuccessResponse(SendEmailDTO, 'Correo enviado correctamente')
  @ApiCommonResponses()
  async enviarCorreo(@Body() sendEmailDto: SendEmailDTO) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}