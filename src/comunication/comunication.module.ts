import { Module } from '@nestjs/common';
import { ComunicacionController } from '@/comunication/comunicacion.controller';
import { EmailModule } from '@/comunication/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [ComunicacionController]
})
export class ComunicacionModule {}