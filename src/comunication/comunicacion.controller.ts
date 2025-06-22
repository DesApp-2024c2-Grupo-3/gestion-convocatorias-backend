import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EmailService } from '@/comunication/email/email.service';
import { SendEmailDTO } from '@/comunication/email/dtos/send-email.DTO';
import { SendBulkEmailDTO } from '@/comunication/email/dtos/send-bulk-email.DTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiSuccessResponse, ApiCommonResponses } from '@/common/decorators/api-response.decorator';

@ApiTags('Comunicación')
@Controller('comunicacion')
@UseGuards(JwtAuthGuard)
export class ComunicacionController {
  constructor(private readonly emailService: EmailService) { }

  @Post('enviar-correo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Envía un correo electrónico' })
  @ApiBody({ type: SendEmailDTO })
  @ApiSuccessResponse(SendEmailDTO, 'Correo enviado correctamente')
  @ApiCommonResponses()
  async enviarCorreo(@Body() sendEmailDto: SendEmailDTO) {
    return this.emailService.sendEmail(sendEmailDto);
  }



  @Post('enviar-correo-masivo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Envía un correo electrónico a múltiples destinatarios' })
  @ApiBody({ type: SendBulkEmailDTO })
  @ApiSuccessResponse(SendBulkEmailDTO, 'Correos enviados correctamente')
  @ApiCommonResponses()
  async enviarCorreoMasivo(@Body() sendBulkEmailDto: SendBulkEmailDTO) {
    return this.emailService.sendBulkEmail(sendBulkEmailDto);
  }
}
