import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { emailTemplates } from '@/comunication/email/template.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TemplateService {
  constructor(private readonly configService: ConfigService) {}

  async buildTemplate(type: string, variables: Record<string, any>): Promise<{ sender: string, subject: string, htmlContent: string }> {
    const templateInfo = emailTemplates[type];

    if (!templateInfo) {
      throw new BadRequestException(`El tipo de correo '${type}' no es válido.`);
    }

    const sender = templateInfo.sender || this.configService.get<string>('MAILJET_SENDER_EMAIL');
    const subject = templateInfo.subject;
    const layoutPath = path.join(__dirname, 'templates', '_layout.html');
    const templatePath = path.join(__dirname, 'templates', templateInfo.fileName);
; 
    try {
      const layoutTpl = await fs.readFile(layoutPath, 'utf8');
      const contentTpl = await fs.readFile(templatePath, 'utf8');

      let finalHtml = layoutTpl.replace('{content}', contentTpl);

      const host = this.configService.get<string>('FRONTEND_HOST')
      const url = this.configService.get<string>('NODE_ENV') === 'dev' ? `${host}:${this.configService.get<string>('FRONTEND_PORT')}` : host

      const enhancedVariables = {
        ...variables,
        url: variables.url || url
      };

      for (const key in enhancedVariables) {
        const regex = new RegExp(`{${key}}`, 'g');
        finalHtml = finalHtml.replace(regex, enhancedVariables[key]);
      }
      
      return {sender, subject, htmlContent: finalHtml };

    } catch (e) {
      console.error("Error al leer las plantillas:", e);
      throw new InternalServerErrorException('No se pudo cargar la plantilla de correo.');
    }
  }
}