export const proyectosData = [
    {
      invitados: ['invitado1@gmail.com', 'invitado2@gmail.com'],
      camposExtra: {
        area: 'Ciencias Sociales',
        objetivo: 'Investigar el impacto social de la tecnología'
      },
      presupuesto: {
        gastosCapital: [
          { rubro: 'Computadora', descripcion: 'Compra de laptop para investigación', coste: 200000 },
          { rubro: 'Proyector', descripcion: 'Proyector para presentaciones', coste: 50000 }
        ],
        gastosCorrientes: [
          { rubro: 'Servicio de internet', descripcion: 'Pago mensual', coste: 5000 },
          { rubro: 'Papelería', descripcion: 'Material de oficina', coste: 2000 }
        ]
      }
    },
    {
      invitados: ['invitado3@gmail.com'],
      camposExtra: {
        area: 'Tecnología',
        objetivo: 'Desarrollar una app educativa'
      },
      presupuesto: {
        gastosCapital: [
          { rubro: 'Servidor', descripcion: 'Hosting para la app', coste: 100000 }
        ],
        gastosCorrientes: [
          { rubro: 'Dominio web', descripcion: 'Pago anual', coste: 3000 }
        ]
      }
    }
  ];