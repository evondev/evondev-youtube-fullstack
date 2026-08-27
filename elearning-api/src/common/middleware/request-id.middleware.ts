import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { requestContext } from '../request-context';

export const REQUEST_ID_HEADER = 'x-request-id';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    // Tôn trọng id có sẵn (do gateway/client gửi), không có thì tự sinh.
    const incoming = request.header(REQUEST_ID_HEADER);
    const requestId =
      incoming && incoming.trim() !== '' ? incoming : randomUUID();

    // Trả lại cho client để họ đọc được khi đi báo lỗi.
    response.setHeader(REQUEST_ID_HEADER, requestId);

    // Mọi thứ chạy BÊN TRONG hàm này đều đọc được requestId, kể cả sau await.
    requestContext.run({ requestId }, () => next());
  }
}
