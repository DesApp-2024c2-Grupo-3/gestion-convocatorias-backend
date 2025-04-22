import { Module } from '@nestjs/common';
import { ConvocatoriasController } from './convocatoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Convocatoria, ConvocatoriaSchema } from './convocatoria.schema';
import { ConvocatoriasService } from './convocatoria.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ConvocatoriasController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Convocatoria.name,
        schema: ConvocatoriaSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60m' },
      }),
  }),
  ],
  providers: [ConvocatoriasService],
  exports: [ConvocatoriasService]
})
export class ConvocatoriasModule {}