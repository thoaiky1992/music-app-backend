import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return response.status(status).json(error['response']);
      case HttpStatus.UNAUTHORIZED:
        return response.status(status).json(error['response']);
      case HttpStatus.FORBIDDEN:
        return response.status(status).json(error['response']);
      case HttpStatus.NOT_FOUND:
        return response.status(status).json(error['response']);
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          message: error.message,
        });
      default:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          message: error.message,
        });
    }
  }
}
