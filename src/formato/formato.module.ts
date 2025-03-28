import { Module } from '@nestjs/common';
import { FormatoController } from './formato.controller';
import { FormatoService } from './formato.service';
import { Formato, FormatoSchema } from './formato.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FormatoController],
  imports: [
    MongooseModule.forFeature([
        {
            name: Formato.name,
            schema: FormatoSchema,
        },
    ]),
  ],
  providers: [FormatoService]
})
export class FormatoModule {}
