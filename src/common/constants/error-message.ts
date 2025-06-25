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
    },
    USER_NOT_FOUND: {
        message: 'No existe un usuario con ese email',
        error: 'USER_NOT_FOUND'
    },    
    EMAIL_SEND_ERROR: {
        message: 'Error al enviar el email. La contraseña no fue actualizada',
        error: 'EMAIL_SEND_ERROR'
    },    
    PASSWORD_RECOVERY_ERROR: {
        message: 'Error al procesar la recuperación de contraseña',
        error: 'PASSWORD_RECOVERY_ERROR'
    },
    EMAIL_ALREADY_REGISTERED: {
        message: 'El email ya está registrado',
        error: 'EMAIL_ALREADY_REGISTERED'
    }
} as const;