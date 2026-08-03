# Senior Backend Node.js + NestJS — Resources

> Đã kiểm chứng ngày **2026-08-03**. Chỉ giữ nguồn **chính chủ** hoặc nguồn có uy tín cao.
> Mọi khẳng định trong bài học phải dẫn về đây, không dựa vào trí nhớ.

## Knowledge — Nền tảng (đọc kỹ, quay lại nhiều lần)

- [Node.js — Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
  Guide chính chủ về vì sao việc nặng CPU giết chết throughput của Node, và mô hình worker pool.
  **Dùng cho:** Module 1 (event loop), Module 6 (performance). Đây là mental model quan trọng nhất của Node backend.
- [MDN — HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
  Tham chiếu chuẩn về method, status code, header, caching, CORS, cookie, auth.
  **Dùng cho:** Module 1 (HTTP), Module 4 (cookie/auth), Module 6 (cache header).
- [PostgreSQL — Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
  Chương chính chủ về Read Committed / Repeatable Read / Serializable và anomaly mỗi mức chặn được.
  **Dùng cho:** Bài 20 (transaction). Bắt buộc đọc trước khi viết code đụng tới tiền.
- [The Twelve-Factor App](https://12factor.net/)
  Kỷ luật config-qua-env, tiến trình stateless, disposability.
  **Dùng cho:** Bài 13 (config), Module 7 (deploy).

## Knowledge — Docs chính chủ của stack

- [NestJS Docs](https://docs.nestjs.com/) — phiên bản hiện tại **v11** (`@nestjs/core` 11.1.28, CLI 11.0.24).
  Yêu cầu **Node.js >= 20** ([First steps](https://docs.nestjs.com/first-steps)).
  Trang hay dùng: [Modules](https://docs.nestjs.com/modules) · [Providers](https://docs.nestjs.com/providers) ·
  [Dependency Injection](https://docs.nestjs.com/fundamentals/dependency-injection) ·
  [Controllers](https://docs.nestjs.com/controllers) · [Pipes](https://docs.nestjs.com/pipes) ·
  [Validation](https://docs.nestjs.com/techniques/validation) · [Guards](https://docs.nestjs.com/guards) ·
  [Interceptors](https://docs.nestjs.com/interceptors) ·
  [Exception filters](https://docs.nestjs.com/exception-filters) ·
  [Configuration](https://docs.nestjs.com/techniques/configuration) ·
  [Authentication](https://docs.nestjs.com/security/authentication) ·
  [Authorization](https://docs.nestjs.com/security/authorization) ·
  [Task scheduling](https://docs.nestjs.com/techniques/task-scheduling) ·
  [Queues (BullMQ)](https://docs.nestjs.com/techniques/queues) ·
  [Caching](https://docs.nestjs.com/techniques/caching) ·
  [Testing](https://docs.nestjs.com/fundamentals/testing) ·
  [Microservices](https://docs.nestjs.com/microservices/basics) ·
  [Prisma recipe](https://docs.nestjs.com/recipes/prisma)
- [Prisma Docs](https://www.prisma.io/docs/orm) — phiên bản hiện tại **v7** (7.9.1).
  ⚠️ **v7 thay đổi lớn:** generator mặc định là `prisma-client` (không phải `prisma-client-js`), `output` giờ
  **bắt buộc**, client sinh vào source tree chứ không nằm trong `node_modules`, và Postgres dùng
  **driver adapter** (`@prisma/adapter-pg` + `pg`). Mọi tutorial cũ trên mạng sẽ sai ở đây.
  [Quickstart Postgres + TypeScript](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql) ·
  [Upgrade guide v7](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7)
- [PostgreSQL Docs (current = 18)](https://www.postgresql.org/docs/current/index.html)
- [Node.js download / release status](https://nodejs.org/en/download) — Active LTS hiện tại là **v24**;
  máy Tuấn đang chạy **v22.18.0**, vẫn thoả yêu cầu `>= 20` của NestJS 11 → chưa cần nâng.
- [Docker Desktop cho Mac](https://docs.docker.com/desktop/setup/install/mac-install/) ·
  [image `postgres`](https://hub.docker.com/_/postgres) · [image `redis`](https://hub.docker.com/_/redis)
- [Stripe — Payments](https://docs.stripe.com/payments)
  Dùng cho Module 5. Ngoài việc tích hợp, đây là ví dụ mẫu mực về **API semantics** (PaymentIntent,
  webhook, idempotency key) — đáng đọc kể cả khi cuối cùng dùng VNPay.

## Wisdom (Communities)

- [NestJS Discord chính thức](https://discord.com/invite/G7Qnnhy)
  Link nằm ngay trên nestjs.com. **Dùng cho:** hỏi vướng mắc kiến trúc, review cách chia module.
- [Stack Overflow — tag `nestjs`](https://stackoverflow.com/questions/tagged/nestjs)
  **Dùng cho:** lỗi cụ thể có thông báo lỗi rõ ràng.
- [NestJS YouTube chính thức](https://www.youtube.com/@nestframework) — talk & release notes.
- ⚠️ **Chưa kiểm chứng được** (môi trường soạn bài bị chặn mạng tới Reddit/Facebook):
  r/Nestjs_framework, các group Facebook "Node.js Việt Nam" / "Cộng đồng Dev&Tech Việt Nam".
  Sẽ xác minh mức độ hoạt động trước khi khuyến nghị chính thức.

## Gaps — cần tìm thêm

- **Cổng thanh toán VN (VNPay / MoMo / PayOS):** chưa chọn & chưa kiểm chứng docs. Phải làm trước Module 5.
  Quyết định phụ thuộc: khách hàng freelance của Tuấn là VN hay quốc tế?
- **Marketplace freelance & định giá cho dev Node remote:** chưa có nguồn đáng tin. Cần cho Bài 56.
- **Nguồn tiếng Việt chất lượng cao về backend:** chưa tìm thấy nguồn nào đủ chuẩn để đưa vào.
  Hiện tại toàn bộ knowledge lấy từ docs tiếng Anh, tôi dịch/giải thích lại bằng tiếng Việt trong bài.
