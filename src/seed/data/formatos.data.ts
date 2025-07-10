// src/seed/data/formatos.data.ts

export const formatosData = [
    {
      nombreDelFormato: 'Formato de Proyecto de Investigación',
      campos: [
        { nombreDelCampo: 'Titulo del Proyecto', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Descripcion', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Resumen', tipo: 'texto', maxNumeroDeCaracteres: 1000 },
        { nombreDelCampo: 'Área de Investigación', tipo: 'selector', opciones: ['Ciencias Sociales', 'Ciencias Naturales', 'Tecnología', 'Humanidades', 'Arte'] }
      ]
    },
    {
      nombreDelFormato: 'Formato de Solicitud de Beca',
      campos: [
        { nombreDelCampo: 'Titulo del Proyecto', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Descripcion', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Nombre del Estudiante', tipo: 'texto', maxNumeroDeCaracteres: 100 },
        { nombreDelCampo: 'Carrera', tipo: 'texto', maxNumeroDeCaracteres: 100 },
        { nombreDelCampo: 'Año de Cursado', tipo: 'selector', opciones: ['1er Año', '2do Año', '3er Año', '4to Año', '5to Año'] }
      ]
    },
    {
      nombreDelFormato: 'Formato de Innovación Tecnológica',
      campos: [
        { nombreDelCampo: 'Titulo del Proyecto', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Descripcion', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Tecnología Aplicada', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Tipo de Innovación', tipo: 'selector', opciones: ['Software', 'Hardware', 'Redes', 'Sistemas', 'Otros'] }
      ]
    },
    {
      nombreDelFormato: 'Formato de Evaluación de Proyectos',
      campos: [
        { nombreDelCampo: 'Titulo del Proyecto', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Descripcion', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Criterio', tipo: 'texto', maxNumeroDeCaracteres: 100 },
        { nombreDelCampo: 'Puntaje', tipo: 'texto', maxNumeroDeCaracteres: 10 }
      ]
    },
    {
      nombreDelFormato: 'Formato de Arte y Cultura',
      campos: [
        { nombreDelCampo: 'Titulo del Proyecto', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Descripcion', tipo: 'texto', maxNumeroDeCaracteres: 200 },
        { nombreDelCampo: 'Nombre de la Obra', tipo: 'texto', maxNumeroDeCaracteres: 150 },
        { nombreDelCampo: 'Disciplina', tipo: 'texto', maxNumeroDeCaracteres: 100 }
      ]
    }
  ];