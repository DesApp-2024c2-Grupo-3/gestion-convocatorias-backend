export const ValidationMessages = {
    REQUIRED: 'El campo es obligatorio',
    INVALID_TYPE: 'El tipo de dato no es válido',

    STRING: {
        INVALID: 'Debe ser una cadena de texto',
        MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
        MAX_LENGTH: (max: number) => `No puede tener más de ${max} caracteres`,
        INVALID_FORMAT: 'El formato no es válido',
    },
    
    EMAIL: {
        INVALID: 'El correo electrónico no es válido',
        REQUIRED: 'El correo electrónico es obligatorio',
        INVALID_DOMAIN: 'El dominio del correo electrónico no es válido',
    },
    
    PASSWORD: {
        INVALID: 'La contraseña no es válida',
        REQUIRED: 'La contraseña es obligatoria',
        MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
        PATTERN: 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
        MATCH: 'Las contraseñas no coinciden',
    },
    
    NUMBER: {
        INVALID: 'Debe ser un número',
        MIN: (min: number) => `Debe ser mayor o igual a ${min}`,
        MAX: (max: number) => `Debe ser menor o igual a ${max}`,
    },
    
    DATE: {
        INVALID: 'La fecha no es válida',
        MIN: (minDate: string) => `La fecha no puede ser anterior a ${minDate}`,
        MAX: (maxDate: string) => `La fecha no puede ser posterior a ${maxDate}`,
        RANGE: (minDate: string, maxDate: string) => 
            `La fecha debe estar entre ${minDate} y ${maxDate}`,
        FORMAT: 'El formato de fecha debe ser DD-MM-YYYY (por ejemplo: 12-01-2083)',
        FUTURE: 'La fecha no puede ser futura',
        PAST: 'La fecha no puede ser pasada',
        INVALID_RANGE: 'La fecha de inicio debe ser anterior a la fecha de fin',
        REQUIRED: 'La fecha es obligatoria'
    },

    OBJECT: {
        INVALID: 'El objeto no es válido',
    },
};