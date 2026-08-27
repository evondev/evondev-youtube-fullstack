import { ConsoleLogger, Injectable } from '@nestjs/common';
import { getRequestId } from './request-context';

@Injectable()
export class AppLogger extends ConsoleLogger {
  private tag(message: unknown): string {
    const requestId = getRequestId();
    return requestId
      ? `[${requestId.slice(0, 8)}] ${String(message)}`
      : String(message);
  }

  log(message: unknown, ...rest: unknown[]) {
    super.log(this.tag(message), ...(rest as string[]));
  }
  error(message: unknown, ...rest: unknown[]) {
    super.error(this.tag(message), ...(rest as string[]));
  }
  warn(message: unknown, ...rest: unknown[]) {
    super.warn(this.tag(message), ...(rest as string[]));
  }
}
