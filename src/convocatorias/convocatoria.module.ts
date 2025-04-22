import { Module } from '@nestjs/common';
import { ConvocatoriasController } from './convocatoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Convocatoria, ConvocatoriaSchema } from './convocatoria.schema';
import { ConvocatoriasService } from './convocatoria.service';
import { JwtModule } from '@nestjs/jwt'; // Añade esta importación

@Module({
  controllers: [ConvocatoriasController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Convocatoria.name,
        schema: ConvocatoriaSchema,
      },
    ]),
    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [ConvocatoriasService],
  exports: [ConvocatoriasService]
})
export class ConvocatoriasModule {}