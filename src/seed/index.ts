import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { LoggerService } from '@/common/services/logger.service';
import * as readline from 'readline';
import { UsuarioSeeder } from '@/seed/seeders/usuario.seeder';
import { FormatoSeeder } from '@/seed/seeders/formato.seeder';
import { ConvocatoriaSeeder } from '@/seed/seeders/convocatoria.seeder';
import { ProyectoSeeder } from '@/seed/seeders/proyecto.seeder';


async function confirmContinue(): Promise<boolean> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('⚠️ Esto borrará toda la base de datos. ¿Estás seguro? (S/N): ', (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase() == 's');
      });
    });
  }


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new LoggerService();
  
  const continuar = await confirmContinue();
  if (!continuar) {
    logger.log('Operación cancelada por el usuario.');
    await app.close();
    process.exit(0);
  }

  logger.log('🌱 Iniciando seeders ..');

  try {
    const usuarioSeeder = new UsuarioSeeder(app);
    await usuarioSeeder.seed();
    logger.log('✅ ¡Seeder de usuarios completado exitosamente!');

    const formatoSeeder = new FormatoSeeder(app);
    await formatoSeeder.seed();
    logger.log('✅ ¡Seeder de formatos completado exitosamente!');

    const convocatoriaSeeder = new ConvocatoriaSeeder(app);
    await convocatoriaSeeder.seed();
    logger.log('✅ ¡Seeder de convocatorias completado exitosamente!');

    const proyectoSeeder = new ProyectoSeeder(app);
    await proyectoSeeder.seed();
    logger.log('✅ ¡Seeder de proyectos completado exitosamente!');

  } catch (error) {
    logger.error('❌ Error durante el seeding:', error);
  } finally {
    await app.close();
    logger.log('🔒 Conexión cerrada. Seeder finalizado.');
  }
}

bootstrap();
