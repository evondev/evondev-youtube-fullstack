# NOTES — Sổ tay người dạy

## Bối cảnh người học

- **Tuấn** (trananhtuan400@gmail.com), macOS, học bằng **tiếng Việt**.
- **Đã vững:** TypeScript, React, Next.js, Tailwind. Có CLAUDE.md global rất chi tiết về convention
  (feature-based folder, kebab-case file, `interface` > `type`, `cn()` cho className…) → người học
  **có gu kỹ thuật, quan tâm chất lượng code**, không phải người mới hoàn toàn với lập trình.
- **Backend:** tự đánh giá "chưa biết gì" → bắt đầu từ HTTP / Node runtime / event loop.
  ⚠️ **Cần kiểm chứng lại bằng quiz ở Bài 01** — người biết Next.js API routes thường đã biết nhiều
  hơn họ nghĩ. Nếu quiz cho thấy đã nắm, **gộp bài** (lộ trình co giãn).

## Preferences đã ghi nhận

- Ghét học lý thuyết suông và ghét "học xong hết rồi mới làm dự án" → **mỗi bài phải chạm project
  e-learning**, dù chỉ một endpoint nhỏ.
- Muốn **hiểu bản chất & vì sao**, không học vẹt.
- 5–7h/tuần → bài ~40 phút, tự chứa.
- Mục tiêu: freelance/remote lương cao + tự làm startup → **thiên về "tự làm trọn vẹn & vận hành"**
  hơn là "luyện thi phỏng vấn". Vẫn giữ "Góc phỏng vấn" cho các khái niệm hay bị khách/nhà tuyển
  dụng hỏi, nhưng **ưu tiên deploy thật, chi phí thật, vận hành thật** hơn là bài mock LeetCode.

## Môi trường máy (đã dò 2026-08-03)

| Công cụ | Trạng thái |
|---|---|
| Node | v22.18.0 ✅ (LTS 22) |
| npm | 11.12.1 ✅ |
| pnpm | 9.10.0 ✅ |
| yarn | 1.22.19 (không dùng) |
| Nest CLI | 11.0.23 ✅ (đã cài global) |
| Docker | 28.0.1 + Compose v2.33.1 ✅ nhưng **daemon chưa chạy** → Bài 00 phải nhắc mở Docker Desktop |
| PostgreSQL | 18.3 (Homebrew, cài native) — nhưng lộ trình dùng **Postgres trong Docker** để đồng nhất; `psql` client dùng lại được |
| git | 2.22.0 (cũ, macOS bundled — chưa cần nâng) |
| Workspace | **CHƯA phải git repo** → phải hỏi trước khi `git init` (theo teach-preferences) |

## ✅ Đã làm rõ (2026-08-03)

Trên máy có container `my-nest-app-db-1` (postgres:16) và `goclaw-postgres-1` (pgvector:pg18) —
đã hỏi, Tuấn xác nhận **đó không phải project do Tuấn viết**; nền backend đúng là từ 0.
→ Giữ nguyên lộ trình 57 bài, **không rút gọn Module 1**. Xem `learning-records/0001`.

**Lộ trình đã chốt:** Tuấn chọn "chốt như vậy, bắt đầu luôn" — không đổi thứ tự, không rút gọn.
**Git:** đã `git init` (branch `main`), Tuấn đồng ý commit theo từng bài. Chưa có remote → chỉ commit,
chưa push.

## Kết quả verify Bài 00 (chạy thật, 2026-08-03)

- `nest new elearning-api --package-manager npm --skip-git --strict` → OK, sinh Nest **11.0.1**,
  TypeScript 5.7, Jest 30.
- `npm test` → 1 passed. ✅
- ⚠️ **Cổng 3000 bị Next.js của Tuấn chiếm** (node PID 74939) → `EADDRINUSE`. Bài 00 chuyển sang **3333** (đã verify xanh, trả `Hello World!`).
- ⚠️ **Cổng 5432 bị Postgres Homebrew chiếm** → Docker Postgres map ra **5433** (free). Redis map **6380** (6379 cũng free nhưng giữ quy ước "+1").
- 🐛 **Bug thật đã bắt được:** `postgres:18-alpine` **đổi điểm gắn volume** sang `/var/lib/postgresql`
  (PGDATA = `/var/lib/postgresql/18/docker`). Dùng `/var/lib/postgresql/data` như mọi tutorial cũ →
  container **crash-loop**. Đã sửa và verify lại từ trạng thái sạch → cả 2 container `(healthy)`.
- `psql -h localhost -p 5433` từ host → `SELECT 1+1` = 2 ✅ · `redis-cli ping` → PONG ✅
- Đã dọn sạch container/volume sandbox sau khi verify.
- **Tôi đã tự mở Docker Desktop** trên máy Tuấn để verify (daemon đang tắt). Hệ quả: 3 container cũ của
  Tuấn (`my-nest-app-db-1`, `goclaw-*`) có `restart` policy nên đã tự bật lại theo.

## ⚠️ Prisma 7 — cạm bẫy cho Module 3

Prisma hiện là **v7** (7.9.1), thay đổi phá vỡ so với mọi tutorial cũ:
generator mặc định là `prisma-client` (không phải `prisma-client-js`), `output` **bắt buộc**, client
sinh vào source tree chứ không nằm trong `node_modules`, và Postgres cần **driver adapter**
(`@prisma/adapter-pg` + `pg`). → Bài 17 phải soạn theo docs v7, tuyệt đối không theo trí nhớ.

## Việc cần làm / theo dõi

- [ ] Hỏi Tuấn có muốn `git init` workspace này không (để commit theo bài).
- [ ] Bài 01: quiz dò lại trình độ thật về HTTP/Node — điều chỉnh lộ trình theo kết quả.
- [ ] Khi tới Module 5 (thanh toán): hỏi Tuấn muốn Stripe (khách quốc tế/remote) hay VNPay/MoMo
      (khách VN) — ảnh hưởng lớn tới bài webhook.
