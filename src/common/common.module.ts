import { Module, Global } from '@nestjs/common';
import { LoggerService } from '@/common/services/logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class CommonModule {}