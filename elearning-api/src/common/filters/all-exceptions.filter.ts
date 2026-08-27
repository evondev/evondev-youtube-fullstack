import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { getRequestId } from '../request-context';

interface ErrorBody {
  statusCode: number;
  error: string;
  messages: string[];
  path: string;
  timestamp: string;
  requestId?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Gom mọi kiểu message về MỘT dạng: luôn là mảng chuỗi.
    let messages: string[];
    let error: string;

    if (isHttpException) {
      const payload = exception.getResponse();
      if (typeof payload === 'string') {
        messages = [payload];
        error = exception.name;
      } else {
        const body = payload as { message?: string | string[]; error?: string };
        messages = Array.isArray(body.message)
          ? body.message
          : [body.message ?? exception.message];
        error = body.error ?? exception.name;
      }
    } else {
      // Lỗi KHÔNG lường trước: ghi log đầy đủ cho mình,
      // trả ra ngoài câu chung chung. Xem phần 5 để hiểu vì sao.
      messages = ['Internal server error'];
      error = 'Internal Server Error';
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ErrorBody = {
      statusCode,
      error,
      messages,
      path: request.url,
      timestamp: new Date().toISOString(),
      requestId: getRequestId(),
    };

    response.status(statusCode).json(body);
  }
}
