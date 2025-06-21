import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MongooseError } from 'mongoose';
import { ErrorMessages } from '../constants/error-message';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
    constructor() {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(error => {
                if (error instanceof HttpException) {
                    return throwError(() => error);
                }

                if (error instanceof MongooseError) {
                    return throwError(() => new InternalServerErrorException(ErrorMessages.DATABASE_ERROR));
                }

                return throwError(() => new InternalServerErrorException(ErrorMessages.INTERNAL_ERROR));
            })
        );
    }
}