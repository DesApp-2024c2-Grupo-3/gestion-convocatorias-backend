export const ErrorMessages = {
    INVALID_ID: {
        message: 'El ID proporcionado no es válido',
        error: 'INVALID_ID'
    },
    NOT_FOUND: {
        message: 'El recurso solicitado no existe',
        error: 'NOT_FOUND'
    },
    UNAUTHORIZED: {
        message: 'No tienes autorización para realizar esta acción',
        error: 'UNAUTHORIZED'
    },
    INVALID_DATA: {
        message: 'Los datos proporcionados no son válidos',
        error: 'INVALID_DATA'
    },
    INTERNAL_ERROR: {
        message: 'Error interno del servidor',
        error: 'INTERNAL_SERVER_ERROR'
    },
    DATABASE_ERROR: {
        message: 'Error al consultar la base de datos',
        error: 'DATABASE_ERROR'
    },
    INVALID_DATES: {
        message: 'Las fechas proporcionadas no son válidas',
        error: 'INVALID_DATES'
    },
    INVALID_FORMATO: {
        message: 'El formato que desea utilizar no existe',
        error: 'INVALID_FORMATO'
    }
} as const;