import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorMessages } from '../constants/error-message';


export const ApiSuccessResponse = (type: any, description: string) => {
    return applyDecorators(
        ApiResponse({ 
            status: 200, 
            description: description,
            type: type,
            schema: {
                type: 'object',
                properties: {
                    data: { 
                        type: type,
                        description: 'Datos de la respuesta'
                    },
                    message: { 
                        type: 'string',
                        example: 'Operación exitosa'
                    }
                }
            }
        })
    );
};

export const ApiCreatedResponse = (type: any, description: string) => {
    return applyDecorators(
        ApiResponse({ 
            status: 201, 
            description: description,
            type: type,
            schema: {
                type: 'object',
                properties: {
                    data: { 
                        type: type,
                        description: 'Datos del recurso creado'
                    },
                    message: { 
                        type: 'string',
                        example: 'Recurso creado exitosamente'
                    }
                }
            }
        })
    );
};

export const ApiCommonResponses = () => {
    return applyDecorators(
        ApiResponse({ 
            status: 400, 
            description: ErrorMessages.INVALID_DATA.message,
            schema: {
                type: 'object',
                properties: {
                    message: { 
                        type: 'string',
                        example: ErrorMessages.INVALID_DATA.message 
                    },
                    error: { 
                        type: 'string',
                        example: ErrorMessages.INVALID_DATA.error 
                    }
                }
            }
        }),
        ApiResponse({ 
            status: 401, 
            description: ErrorMessages.UNAUTHORIZED.message,
            schema: {
                type: 'object',
                properties: {
                    message: { 
                        type: 'string',
                        example: ErrorMessages.UNAUTHORIZED.message 
                    },
                    error: { 
                        type: 'string',
                        example: ErrorMessages.UNAUTHORIZED.error 
                    }
                }
            }
        }),
        ApiResponse({ 
            status: 500, 
            description: ErrorMessages.INTERNAL_ERROR.message,
            schema: {
                type: 'object',
                properties: {
                    message: { 
                        type: 'string',
                        example: ErrorMessages.INTERNAL_ERROR.message 
                    },
                    error: { 
                        type: 'string',
                        example: ErrorMessages.INTERNAL_ERROR.error 
                    }
                }
            }
        })
    );
};

export const ApiNotFoundResponse = () => {
    return applyDecorators(
        ApiResponse({ 
            status: 404, 
            description: ErrorMessages.NOT_FOUND.message,
            schema: {
                type: 'object',
                properties: {
                    message: { 
                        type: 'string',
                        example: ErrorMessages.NOT_FOUND.message 
                    },
                    error: { 
                        type: 'string',
                        example: ErrorMessages.NOT_FOUND.error 
                    }
                }
            }
        })
    );
};