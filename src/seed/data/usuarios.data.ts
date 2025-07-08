import { ConfigService } from '@nestjs/config';
import { ROLES } from '@/common/constants/roles';

const configService = new ConfigService();

export const usuariosData = [
  {
    nombre: 'Super Administrador',
    email: configService.get<string>('SUPER_ADMIN_EMAIL') || 'superadmin@email.edu.ar',
    password: configService.get<string>('SUPER_ADMIN_PASSWORD') || 'SuperAdmin123!',
    roles: [ROLES.SUPER_ADMIN]
  },
  {
    nombre: 'Administrador General',
    email: 'admin@email.edu.ar',
    password: 'Admin123!',
    roles: [ROLES.ADMIN]
  },
  {
    nombre: 'Investigador Principal',
    email: 'investigador@email.edu.ar',
    password: 'Investigador123!',
    roles: [ROLES.INVESTIGADOR]
  }
];