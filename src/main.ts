import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  const NODE_ENV = configService.get<string>('NODE_ENV');

  const API_HOST = configService.get<string>('API_HOST');
  const API_PORT = configService.get<number>('API_PORT');
  const API_URL = NODE_ENV !== 'dev' ? `http://${API_HOST}:${API_PORT}` : `https://${API_HOST}`;

  const FRONTEND_HOST = configService.get<string>('FRONTEND_HOST');
  const FRONTEND_PORT = configService.get<number>('FRONTEND_PORT');
  const FRONTEND_URL = NODE_ENV === 'dev' ? `http://${FRONTEND_HOST}:${FRONTEND_PORT}` : `https://${FRONTEND_HOST}`;


  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('API Gestión de Convocatorias')
  .setDescription('Documentación de la API de gestión de convocatorias')
  .setVersion('1.0')
  .addBearerAuth(
    {
      description: 'Por favor, ingrese el token en el siguiente formato: <JWT>',
      name: 'Authorization',
      bearerFormat: 'JWT',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    },
    'access-token',
  )
  .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  const corsOptions: CorsOptions = {
    origin: FRONTEND_URL,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, 
    transform:true,
    enableDebugMessages: true
  }))


  await app.listen(API_PORT);

  console.log(`🚀 Servidor corriendo en: ${API_URL}`);
  console.log(`📝 Documentación Swagger disponible en: ${API_URL}/api`);
}
bootstrap();
