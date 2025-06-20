import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class ErrorLoggerInterceptor implements NestInterceptor {
    constructor(private readonly loggerService: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(error => {
                const request = context.switchToHttp().getRequest();
                const { method, url, body, headers } = request;
                const user = request.user;

                this.loggerService.error(
                    `Error en ${method} ${url}`,
                    error.stack,
                    'ErrorLoggerInterceptor'
                );

                return throwError(() => error);
            })
        );
    }
}