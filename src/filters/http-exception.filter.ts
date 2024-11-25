import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { type Response } from 'express';

interface IExceptionResponse {
  message: string | string[];
  statusCode: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

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
      message += `: ${exceptionResponse.message.join(',')}.`;
    }

    response.status(status).json({
      message,
      statusCode: status,
    });
  }
}
