import { Module, Global } from '@nestjs/common';
import { LoggerService } from '@/common/services/logger.service';
import { ValidationMailjetService } from '@/common/services/validationMail_jet.service';

@Global()
@Module({
  providers: [LoggerService, ValidationMailjetService],
  exports: [LoggerService, ValidationMailjetService],
})
export class CommonModule {}