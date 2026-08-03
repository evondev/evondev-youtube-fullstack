# Mission: Senior Backend Engineer với Node.js + NestJS

## Why

Tuấn muốn tự tay **build và vận hành trọn vẹn một hệ thống backend thật** (nền tảng e-learning có
người dùng, thanh toán, khoá học) để (a) nhận được job **freelance/remote lương cao** và (b) đủ năng
lực **tự ship sản phẩm/startup riêng** mà không phụ thuộc ai. Mục tiêu không phải "biết cú pháp
NestJS" mà là **hiểu bản chất**: vì sao hệ thống được thiết kế như vậy, đánh đổi ở đâu, hỏng thì
hỏng chỗ nào.

## Success looks like

- Ship được **e-learning API production thật** (deploy công khai, có domain, có DB thật, có thanh
  toán thật ở sandbox) — dùng làm portfolio khi chào khách freelance.
- Tự thiết kế **schema + kiến trúc** cho một nghiệp vụ mới mà không cần copy tutorial.
- Giải thích trôi chảy **vì sao & đánh đổi**: JWT vs session, transaction isolation, cache
  invalidation, khi nào cần queue, khi nào KHÔNG nên tách microservice.
- Debug được sự cố production: chậm ở đâu, tại sao N+1, tại sao webhook chạy 2 lần.
- Viết được test + CI/CD + rollback, tức là **dám chịu trách nhiệm** cho code chạy thật.
- Trả lời được câu hỏi system design mức senior trong buổi phỏng vấn/pitch với khách.

## Constraints

- **5–7h/tuần (~1h/ngày)** → mỗi bài phải nhỏ, ~40 phút, tự chứa, hoàn thành trong một buổi.
- **Nền tảng:** frontend TypeScript/Next.js/React đã vững (xem CLAUDE.md của Tuấn). Backend bắt đầu
  gần như từ 0 → phải bắc cầu từ TS/React sang khái niệm server.
- **Ghét lý thuyết suông** → mọi bài phải chạm vào project e-learning thật, không học "chay" rồi mới
  làm dự án.
- **Học bằng tiếng Việt**, code có comment tiếng Việt.
- Máy: macOS, Node v22.18.0, pnpm 9.10.0, Docker 28.0.1 (daemon chưa bật), PostgreSQL 18.3 (Homebrew),
  Nest CLI 11.0.23.

## Stack đã chốt

NestJS 11 · TypeScript · PostgreSQL · Prisma · Redis (BullMQ) · Docker · GitHub Actions.
Lý do: đây là combo được hỏi/nhận nhiều nhất ở thị trường remote & freelance Node hiện nay, và
Postgres + transaction là bắt buộc cho nghiệp vụ thanh toán.

## Out of scope (hiện tại)

- Frontend cho e-learning (Tuấn đã vững; chỉ làm API + tài liệu API).
- Kubernetes / hạ tầng quy mô lớn — chỉ chạm ở mức "biết nó giải quyết vấn đề gì".
- Microservices thật sự — sẽ có **1 bài dạy vì sao thường KHÔNG nên tách**, không đi sâu triển khai.
- GraphQL / gRPC / serverless — gộp vào **1 bài survey** cuối lộ trình, không đi sâu.
