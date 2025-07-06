// src/seed/data/convocatorias.data.ts

const hoy = new Date();
const dentroDe30Dias = new Date();
dentroDe30Dias.setDate(hoy.getDate() + 30);
import * as fs from 'fs';
import * as path from 'path';

const pdfPath = (filename: string) => path.join(__dirname, '..', 'files', filename);
console.log(pdfPath('convocatoria_investigacion.pdf'));

export const convocatoriasData = [
  {
    titulo: 'Convocatoria de Investigación',
    descripcion: 'Convocatoria para proyectos de investigación en ciencias sociales.',
    fechaInicio: hoy,
    fechaFin: dentroDe30Dias,
    nombreFormato: 'Formato de Proyecto de Investigación',
    archivo: {
      nombre: 'convocatoria_investigacion.pdf',
      tipo: 'application/pdf',
      contenido: fs.readFileSync(pdfPath('convocatoria_investigacion.pdf'))
    }
  },
  {
    titulo: 'Becas de Excelencia Académica',
    descripcion: 'Programa de becas para estudiantes destacados.',
    fechaInicio: hoy,
    fechaFin: dentroDe30Dias,
    nombreFormato: 'Formato de Solicitud de Beca',
    archivo: {
      nombre: 'becas_excelencia.pdf',
      tipo: 'application/pdf',
      contenido: fs.readFileSync(pdfPath('becas_excelencia.pdf'))
    }
  },
  {
    titulo: 'Convocatoria de Innovación Tecnológica',
    descripcion: 'Convocatoria para proyectos de innovación tecnológica.',
    fechaInicio: hoy,
    fechaFin: dentroDe30Dias,
    nombreFormato: 'Formato de Innovación Tecnológica',
    archivo: {
      nombre: 'convocatoria_innovacion_tecnologica.pdf',
      tipo: 'application/pdf',
      contenido: fs.readFileSync(pdfPath('convocatoria_innovacion_tecnologica.pdf'))
    }
  },
  {
    titulo: 'Premio a la Investigación Joven',
    descripcion: 'Convocatoria para investigadores jóvenes menores de 35 años.',
    fechaInicio: hoy,
    fechaFin: dentroDe30Dias,
    nombreFormato: 'Formato de Proyecto de Investigación',
    archivo: {
      nombre: 'premio_investigacion_joven.pdf',
      tipo: 'application/pdf',
      contenido: fs.readFileSync(pdfPath('premio_investigacion_joven.pdf'))
    }
  },
  {
    titulo: 'Convocatoria de Arte y Cultura',
    descripcion: 'Convocatoria para proyectos artísticos y culturales.',
    fechaInicio: hoy,
    fechaFin: dentroDe30Dias,
    nombreFormato: 'Formato de Arte y Cultura',
    archivo: {
      nombre: 'convocatoria_arte_cultura.pdf',
      tipo: 'application/pdf',
      contenido: fs.readFileSync(pdfPath('convocatoria_arte_cultura.pdf'))
    }
  }
];