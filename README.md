# 🎯 API de Gestión de Convocatorias

Una API REST para la gestión integral de convocatorias de investigación, desarrollada para la Universidad Nacional de Hurlingham.

## 📋 Descripción

Esta API proporciona un backend completo para el sistema de gestión de convocatorias, permitiendo a investigadores, administradores y super administradores gestionar convocatorias de investigación. Incluye funcionalidades para autenticación, gestión de usuarios, convocatorias, proyectos, formatos y comunicación por email.

## 🌐 Frontend

Este proyecto requiere un frontend para funcionar correctamente. El frontend proporciona la interfaz de usuario para interactuar con esta API.

**📁 Repositorio del Frontend:** [gestion-convocatorias-frontend](https://github.com/DesApp-2024c2-Grupo-3/gestion-convocatorias-frontend)


## ✨ Características Principales

### 🔐 Autenticación y Autorización
- Sistema de login/registro con JWT
- Control de acceso basado en roles (investigador, admin, super_admin)
- Gestión de sesiones seguras
- Recuperación de contraseñas por email
- Middleware de autenticación personalizado

### 📢 Gestión de Convocatorias
- CRUD completo de convocatorias
- Subida y gestión de archivos PDF
- Validación de fechas de cierre
- Filtrado y búsqueda de convocatorias
- Control de acceso por roles

### 👥 Gestión de Usuarios
- Panel de administración de usuarios (super_admin)
- Gestión de roles y permisos
- Perfiles de usuario personalizables
- Subida de CV y documentos

### 📝 Postulaciones y Proyectos
- Sistema de postulación a convocatorias
- Gestión de proyectos de investigación
- Validación de formularios
- Asociación de proyectos con convocatorias

### 📊 Formatos y Documentos
- Gestión de formatos de proyectos
- Plantillas personalizables
- Validación de documentos

### 📧 Comunicación
- Envío de emails individuales y masivos
- Plantillas de email personalizables
- Integración con Mailjet

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS** - Framework de Node.js para aplicaciones escalables
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Passport** - Estrategias de autenticación
- **Class Validator** - Validación de datos
- **Swagger** - Documentación de API
- **Winston** - Logging avanzado

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **Nodemon** - Reinicio automático en desarrollo

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- MongoDB Atlas (cuenta gratuita)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/DesApp-2024c2-Grupo-3/gestion-convocatorias-backend.git
cd gestion-convocatorias-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://tu_usuario:<password>@tu_cluster.mongodb.net/gestion_convocatorias?retryWrites=true&w=majority

# Super Admin User for Seeding
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=unaClaveMuySegura123

# JSON Web Token Secret
JWT_SECRET=este-es-un-secreto-muy-secreto

# Server Configuration
API_HOST=localhost
API_PORT=3000
NODE_ENV=development

# Frontend Configuration (for CORS)
FRONTEND_HOST=http://localhost
FRONTEND_PORT=5173
```

### 4. Configurar MongoDB Atlas
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/es/atlas)
2. Crear un cluster gratuito
3. Crear usuario de base de datos
4. Obtener la URI de conexión
5. Reemplazar en el archivo `.env`

### 5. Ejecutar por primera vez (con seeding)
```bash
npm run start:dev:setup
```

Este comando:
- Ejecuta el seeder para crear datos iniciales
- Inicia el servidor en modo desarrollo
- Crea el usuario super admin automáticamente

### 6. Ejecutar en desarrollo (sin seeding)
```bash
npm run start:dev
```

### 7. Verificar la instalación
- **API:** http://localhost:3000
- **Documentación Swagger:** http://localhost:3000/api

## 📁 Estructura del Proyecto

```
src/
├── autenticacion/          # Autenticación y autorización
│   ├── dtos/              # Data Transfer Objects
│   ├── autenticacion.controller.ts
│   ├── autenticacion.service.ts
│   └── autenticacion.module.ts
├── auth/                   # Middleware de autenticación
│   ├── decorators/         # Decoradores personalizados
│   ├── guards/             # Guards de autorización
│   └── services/           # Servicios de token
├── common/                 # Utilidades comunes
│   ├── constants/          # Constantes del sistema
│   ├── decorators/         # Decoradores de respuesta
│   ├── interceptors/       # Interceptores globales
│   └── services/           # Servicios comunes
├── convocatorias/          # Gestión de convocatorias
│   ├── dtos/              # DTOs de convocatorias
│   ├── middlewares/       # Middlewares específicos
│   ├── convocatoria.controller.ts
│   ├── convocatoria.service.ts
│   └── convocatoria.schema.ts
├── usuarios/               # Gestión de usuarios
│   ├── dtos/              # DTOs de usuarios
│   ├── usuarios.controller.ts
│   ├── usuarios.service.ts
│   └── usuarios.schema.ts
├── proyecto/               # Gestión de proyectos
│   ├── dtos/              # DTOs de proyectos
│   ├── proyecto.controller.ts
│   ├── proyecto.service.ts
│   └── proyecto.schema.ts
├── formato/                # Gestión de formatos
│   ├── dtos/              # DTOs de formatos
│   ├── formato.controller.ts
│   ├── formato.service.ts
│   └── formato.schema.ts
├── comunicacion/           # Sistema de comunicación
│   ├── email/             # Servicios de email
│   │   ├── dtos/          # DTOs de email
│   │   ├── templates/     # Plantillas HTML
│   │   └── email.service.ts
│   └── comunicacion.controller.ts
├── seed/                   # Datos iniciales
│   ├── data/              # Datos de ejemplo
│   ├── seeders/           # Seeders específicos
│   ├── files/             # Archivos de ejemplo
│   └── index.ts
└── main.ts                 # Punto de entrada
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev              # Inicia el servidor de desarrollo
npm run start:dev:setup        # Inicia con seeding inicial

# Producción
npm run build                  # Construye para producción
npm run start:prod             # Inicia en modo producción

# Testing
npm run test                   # Ejecuta tests unitarios
npm run test:watch             # Ejecuta tests en modo watch
npm run test:e2e               # Ejecuta tests end-to-end

# Utilidades
npm run seed                   # Ejecuta solo el seeder
npm run lint                   # Ejecuta ESLint
npm run format                 # Formatea código con Prettier
```

## 📚 Endpoints de la API

### 🔐 Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/recover-password` - Recuperar contraseña

### 👥 Usuarios
- `GET /usuario` - Obtener todos los usuarios (Super Admin)
- `GET /usuario/:id` - Obtener usuario por ID (Super Admin)
- `PATCH /usuario/:id/roles` - Actualizar roles (Super Admin)
- `PATCH /usuario/:id/password` - Actualizar contraseña
- `POST /usuario/:id/cv` - Subir CV

### 📢 Convocatorias
- `GET /convocatoria` - Obtener todas las convocatorias
- `GET /convocatoria/:id` - Obtener convocatoria por ID
- `POST /convocatoria` - Crear nueva convocatoria (Admin/Super Admin)
- `PUT /convocatoria/:id` - Actualizar convocatoria (Admin/Super Admin)
- `DELETE /convocatoria/:id` - Eliminar convocatoria (Admin/Super Admin)
- `GET /convocatoria/:id/archivo` - Descargar archivo de convocatoria

### 📝 Proyectos
- `GET /proyecto` - Obtener todos los proyectos
- `GET /proyecto/:id` - Obtener proyecto por ID
- `POST /proyecto/:idConvocatoria` - Crear proyecto para convocatoria
- `GET /proyecto/convocatoria/:idConvocatoria` - Obtener proyectos por convocatoria

### 📊 Formatos
- `GET /formato` - Obtener todos los formatos (Admin/Super Admin)
- `GET /formato/:id` - Obtener formato por ID
- `POST /formato` - Crear nuevo formato (Admin/Super Admin)

### 📧 Comunicación
- `POST /comunicacion/enviar-correo` - Enviar email individual
- `POST /comunicacion/enviar-correo-masivo` - Enviar emails masivos

## 👥 Roles de Usuario

### 🔬 Investigador
- Ver convocatorias disponibles
- Postularse a convocatorias
- Gestionar perfil personal
- Subir CV y documentos

### 👨‍💼 Admin
- Gestionar convocatorias (CRUD)
- Ver postulaciones por convocatoria
- Gestionar formatos
- Ver presupuestos de proyectos

### 👑 Super Admin
- Todas las funcionalidades de Admin
- Gestionar usuarios y roles
- Acceso completo al sistema

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

- Los tokens se generan al hacer login
- Se incluyen automáticamente en las cabeceras de las peticiones API
- Los guards protegen las rutas según el rol del usuario
- Middleware de autenticación valida tokens en cada petición

## 🗄️ Base de Datos

### MongoDB Atlas
- Base de datos en la nube
- Escalabilidad automática
- Backup automático
- Monitoreo en tiempo real

### Colecciones principales:
- **usuarios** - Información de usuarios y roles
- **convocatorias** - Datos de convocatorias y archivos
- **proyectos** - Postulaciones y proyectos de investigación
- **formatos** - Plantillas y formatos de documentos


## 📖 Documentación

### Swagger UI
La documentación interactiva está disponible en:
```
http://localhost:3000/api
```

Incluye:
- Todos los endpoints disponibles
- Esquemas de datos
- Ejemplos de peticiones y respuestas
- Autenticación con JWT

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=secreto-muy-seguro-produccion
API_HOST=0.0.0.0
API_PORT=3000
FRONTEND_HOST=https://tu-dominio.com
FRONTEND_PORT=443
```

### Comandos de Producción
```bash
npm run build
npm run start:prod
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📋 Notas Importantes

### Usuarios y Roles
1. Al ejecutar el seeder por primera vez, se crea automáticamente un usuario super admin
2. Los usuarios nuevos se registran con rol de Investigador por defecto
3. Solo el Super Admin puede cambiar roles de usuarios
4. Los Admins pueden gestionar convocatorias y formatos

### Archivos y Storage
- Los archivos se almacenan localmente en el servidor
- Se recomienda usar un servicio de almacenamiento en la nube para producción
- Los archivos se validan por tipo y tamaño

### Seguridad
- Contraseñas hasheadas con bcrypt
- JWT con tiempo de expiración
- Validación de datos en todos los endpoints
- CORS configurado para el frontend

## 👨‍💻 Desarrollado por

**Universidad Nacional de Hurlingham**  
Sistema de Gestión de Convocatorias de Investigación
