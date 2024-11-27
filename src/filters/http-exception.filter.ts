import { IExceptionResponse } from '@common/interfaces';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus, Logger,
} from '@nestjs/common';
import { type Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message || '';
    const exceptionResponse = exception.getResponse() as IExceptionResponse;

    if (exceptionResponse.message instanceof Array) {
      message += `: ${exceptionResponse.message.join(', ')}.`;
    }
    this.logger.error(message, exception.stack);
    response.status(status).json({
      message,
      statusCode: status,
    });
  }
}
