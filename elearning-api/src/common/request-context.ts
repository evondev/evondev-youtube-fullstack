import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestStore {
  requestId: string;
}

// AsyncLocalStorage: "ngăn kéo" đi theo suốt chuỗi async của MỘT request,
// mà không phải truyền requestId qua từng tham số hàm.
export const requestContext = new AsyncLocalStorage<RequestStore>();

export function getRequestId(): string | undefined {
  return requestContext.getStore()?.requestId;
}
