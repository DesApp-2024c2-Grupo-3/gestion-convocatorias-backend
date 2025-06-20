import { Injectable, Logger } from '@nestjs/common';
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends Logger {
    private logger: WinstonLogger;

    constructor() {
        super();
        
        this.logger = createLogger({
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
 
                new DailyRotateFile({
                    filename: 'logs/error-%DATE%.log',
                    datePattern: 'YYYY-MM',
                    level: 'error',
                    maxSize: '20m',
                    maxFiles: '14d'
                }),

                new DailyRotateFile({
                    filename: 'logs/combined-%DATE%.log',
                    datePattern: 'YYYY-MM',
                    maxSize: '20m',
                    maxFiles: '14d'
                }),

                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                })
            ]
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple()
                )
            }));
        }
    }

    error(message: string, stack?: string, context?: string) {
        this.logger.error(message, { 
            context: context || 'Application',
            trace: stack 
        });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { 
            context: context || 'Application'
        });
    }

    log(message: string, context?: string) {
        this.logger.info(message, { 
            context: context || 'Application'
        });
    }
}