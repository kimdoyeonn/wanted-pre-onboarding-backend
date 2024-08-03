import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      timestamp: new Date().toISOString(),
      message: 'User already has a company',
    });
  }
}
