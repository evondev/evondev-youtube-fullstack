# Bài 00 hoàn thành — sân tập đã chạy thật (2026-08-05)

## Đã kiểm chứng bằng máy, không chấm chay (rule A18)

Tuấn báo "học xong Bài 00". Tôi đọc file thật + chạy thật trong `elearning-api/`:

| Kiểm tra | Kết quả |
|---|---|
| `npm test` | 1 passed, 1 total ✅ |
| `docker compose ps` | `elearning-postgres` + `elearning-redis` đều `Up (healthy)` ✅ |
| Cổng map | 5433→5432 và 6380→6379, đúng như bài dạy ✅ |
| `src/main.ts` | `process.env.PORT ?? 3333` — đã đổi cổng đúng ✅ |
| `docker-compose.yml` | volume gắn `/var/lib/postgresql` (đúng cho Postgres 18, không dính bẫy crash-loop) ✅ |
| `curl localhost:3333` | `200 OK`, `X-Powered-By: Express`, `Hello World!` ✅ |

→ Sân tập đạt chuẩn. **Không cần làm lại gì.**

## Nắm được

- Phân biệt "container Up" và "service healthy" — đã thể hiện qua việc healthcheck còn nguyên trong file.
- Giữ nguyên cấu hình cổng 3333/5433/6380 thay vì copy mặc định từ tutorial.

## Chưa biết / cần theo dõi

- **Chưa có dữ liệu về trình độ HTTP thật.** Bài 00 không đo được điều này (nó là bài dựng môi trường).
  → Bài 01 đã cài **câu quiz số 4 dò nền** (từng viết API route Next.js chưa / từng viết server Node chưa).
  Kết quả câu này quyết định: nắm chắc cả 3 câu đầu + từng viết server → **gộp Bài 02 và bật chế độ
  thử thách**; ngược lại giữ nhịp cầm tay chỉ việc.
- Chưa chạm code backend nào do chính Tuấn viết → Bài 01 là mẫu code tự viết ĐẦU TIÊN. Chấm kỹ
  bài tập `lab/01-bai-tap.mjs` (đọc file + chạy thật), đặc biệt xem có nhánh nào **thiếu response** không.

## Ghi chú vận hành

- Module 0 chuyển sang trạng thái xong → đã soạn `reference/docker-lenh-thiet-yeu.html` (rule A22).
- Bộ đếm cheat-sheet reset: trigger kế tiếp là **Bài 05**.
