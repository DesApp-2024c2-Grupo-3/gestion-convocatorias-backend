import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailjet from 'node-mailjet';
import { SendEmailDTO } from '@/comunication/email/dtos/send-email.DTO';
import { TemplateService } from '@/comunication/email/template.service';
import { LoggerService } from '@/common/services/logger.service';

@Injectable()
export class EmailService {
  private mailjet: Mailjet.Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly templateService: TemplateService,
    private readonly logger: LoggerService,
  ) {
    const apiKey = this.configService.get<string>('MAILJET_API_KEY');
    const apiSecret = this.configService.get<string>('MAILJET_SECRET_KEY');

    this.mailjet = new Mailjet.Client({
      apiKey,
      apiSecret,
    });
  }

  async sendEmail(emailData: SendEmailDTO) {
    const { toEmail, toName, type, variables, fromEmail } = emailData;

    const emailContent = await this.templateService.buildTemplate(type, { ...variables, toName });
    const { subject, htmlContent } = emailContent;

    const defaultSender = this.configService.get<string>('MAILJET_SENDER_EMAIL');
    const senderEmail = fromEmail || emailContent.sender || defaultSender;

    const request = this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [{
        From: { Email: senderEmail, Name: 'Tu Aplicación de Convocatorias' },
        To: [{ Email: toEmail, Name: toName }],
        Subject: subject,
        HTMLPart: htmlContent,
      }],
    });

    try {
      const result = await request;
      const messages = (result.body as any).Messages;
      const status = Array.isArray(messages) && messages.length > 0 && messages[0].Status === 'success';
      return {
        status,
        message: 'Correo enviado correctamente',
      };
    } catch (error) {
      this.logger.error('Error al enviar el correo', error.message,);
      return {
        status: false,
        message: 'Error al enviar el correo',
      };
    }
  }
}