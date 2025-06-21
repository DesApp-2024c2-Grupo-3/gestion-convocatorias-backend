import { ConfigService } from '@nestjs/config';

export interface TemplateInfo {
    sender: string;
    fileName: string;
    subject: string;
  }
  
  export const emailTemplates: Record<string, TemplateInfo> = {
    invitacion_grupo_convocatoria: {
      sender: '',
      fileName: 'invitacion_grupo_convocatoria.html',
      subject: 'Has sido invitado a un grupo de convocatoria',
    },
    registro_exitoso: { 
      sender: '',
      fileName: 'registro_exitoso.html',
      subject: '¡Bienvenido a la Plataforma de Convocatorias!',
    },
  };