import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailjet from 'node-mailjet';

@Injectable()
export class ValidationMailjetService {
  private mailjet: Mailjet.Client;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('MAILJET_API_KEY');
    const apiSecret = this.configService.get<string>('MAILJET_SECRET_KEY');

    this.mailjet = new Mailjet.Client({
      apiKey,
      apiSecret,
    });
  }

  async validateMailjetConnection(): Promise<{ isConnected: boolean; error?: string }> {
    try {
      const apiKey = this.configService.get<string>('MAILJET_API_KEY');
      const apiSecret = this.configService.get<string>('MAILJET_SECRET_KEY');
      
      if (!apiKey || !apiSecret) {
        return {
          isConnected: false,
          error: 'Credenciales de Mailjet no configuradas'
        };
      }

      const testRequest = this.mailjet.get('user', { version: 'v3' }).request();
      await testRequest;
      
      return { isConnected: true };
    } catch (error) {
      return {
        isConnected: false,
        error: `Error de conexión con Mailjet: ${error.message}`
      };
    }
  }
}