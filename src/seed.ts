import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ROLES } from '@/common/constants/roles';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Usuario } from '@/usuarios/usuarios.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  console.log('¡Conectado a la aplicación para el seeder!');

  const usuarioModel = app.get<Model<Usuario>>(getModelToken(Usuario.name));
  const configService = app.get(ConfigService);

  const superAdminEmail = configService.get<string>('SUPER_ADMIN_EMAIL');
  const superAdminPassword = configService.get<string>('SUPER_ADMIN_PASSWORD');

  if (!superAdminEmail || !superAdminPassword) {
    console.error(
      'Error: SUPER_ADMIN_EMAIL y SUPER_ADMIN_PASSWORD deben estar en el .env',
    );
    await app.close();
    return;
  }

  try {
    const superAdminExists = await usuarioModel.findOne({
      email: superAdminEmail,
    });

    if (superAdminExists) {
      console.log('✅ El usuario superadmin ya existe. No se hace nada.');
    } else {
      console.log('Creando el usuario superadmin...');

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(superAdminPassword, saltRounds);

      const superAdmin = new usuarioModel({
        nombre: 'Super Administrador',
        email: superAdminEmail,
        password: hashedPassword,
        roles: [ROLES.SUPER_ADMIN],
        baja: false,
        cv: null,
      });
      await superAdmin.save();

      console.log('✅ ¡Usuario superadmin creado con éxito!');
    }
  } catch (error) {
    console.error('❌ Error al ejecutar el seeder:', error);
  } finally {
    await app.close();
    console.log('Seeder finalizado. Conexión cerrada.');
  }
}

bootstrap();