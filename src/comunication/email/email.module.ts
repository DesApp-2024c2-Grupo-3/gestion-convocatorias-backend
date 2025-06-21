import { Module } from '@nestjs/common';
import { EmailService } from '@/comunication/email/email.service';
import { TemplateService } from '@/comunication/email/template.service';

@Module({
  providers: [EmailService, TemplateService],
  exports: [EmailService],
})
export class EmailModule {}