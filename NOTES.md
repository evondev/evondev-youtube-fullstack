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
**Git:** đã `git init` (branch `main`), remote `origin` =
https://github.com/evondev/evondev-youtube-fullstack.git.
⚠️ **Rule Tuấn chốt 2026-08-05:** phải **commit VÀ push xong bài trước rồi mới được soạn bài mới** —
mỗi bài một commit riêng, một lần push riêng, không dồn.

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

## Chế độ dự án song song: **BẬT** (rule A27)

`elearning-api` **là** sân tập, không có thư mục practice riêng. Mỗi bài phải đắp một mẩu chạy được
vào dự án; `index.html` đã ghi rõ từng bài thêm gì (cột phải).
**Ngoại lệ đã khai báo công khai:** Bài 01–04, 07, 24, 55 là kiến thức nền (sống ở `lab/` hoặc là khảo
sát) — đã nói thẳng trong intro-card, không ghép gượng.

## Bộ đếm cheat-sheet (rule A22 — mốc CỨNG)

Trigger: **cứ 5 bài** kể từ cheat-sheet gần nhất, **HOẶC** một module chuyển sang xong — cái nào tới trước.
Cách đếm: số file trong `reference/` so với số bài trong `lessons/`.

| Mốc | Trạng thái |
|---|---|
| Bài đã soạn | 2 (Bài 00, Bài 01) |
| Cheat-sheet đã có | 1 — `reference/docker-lenh-thiet-yeu.html` (soạn 2026-08-05, khi Module 0 xong) |
| **Trigger kế tiếp** | **Bài 05** (đủ 5 bài kể từ cheat-sheet gần nhất) — hoặc sớm hơn nếu Module 1 xong trước |

## Việc cần làm / theo dõi

- [x] `git init` — đã làm, branch `main`. Chưa có remote → chỉ commit, chưa push.
- [x] Chấm bài tập Bài 01 — đạt sau 1 lần revise. Xem `learning-records/0003`.

## 🎥 QUAN TRỌNG — khoá này là series YouTube (rõ 2026-08-05)

Tuấn **quay khoá này thành series "Từ Frontend Đến Fullstack Cùng AI trong 60 ngày"** (1 bài = 1 tập;
Bài 00 = Ngày 01, Bài 01 = Ngày 02). Khán giả là **người mới**.

→ Ở quiz dò nền Bài 01, Tuấn **cố ý chọn A** ("chưa từng viết server Node") dù **thực tế đã từng viết
rồi** — chọn nhịp cho khán giả, không phải tự đánh giá sai.

⚠️ **Tuấn GHI HÌNH NGAY TRONG LÚC HỌC** (kiểu "vừa live vừa học"), không phải học xong rồi quay lại.
**Câu trả lời của tôi trong chat chính là nội dung lên hình** — không có bản nháp, không có take 2:
- Trả lời **gọn, có cấu trúc, đọc lên thành lời được**; tránh tường chữ và bảng quá rộng.
- **Không đề nghị "gợi ý bố cục quay"** — không có diễn tập thì bố cục vô nghĩa.
- Chấm bài sai thì **nói thẳng ngay**; vấp rồi sửa trên sóng là nội dung tốt, đừng làm nhẹ đi.
- **Soạn xong bài HTML TRƯỚC** khi Tuấn vào phần thực hành, để Tuấn vừa mở vừa làm theo trên sóng.

**Cách dạy từ Bài 02 trở đi — tách đôi mỗi bài:**

| Phần | Nhịp | Vì sao |
|---|---|---|
| **Nội dung bài (lên hình)** | Trình độ **người mới**: từng bước đánh số, không nhảy cóc, giải thích cả thứ "ai cũng biết", mọi lệnh copy-paste được | Khán giả phải làm theo được |
| **Phần riêng cho Tuấn** | Nâng độ khó ở **tự kiểm chứng / tự nghĩ ca test** — KHÔNG nâng ở cú pháp | Đó mới là chỗ Tuấn thật sự vấp (record 0003), cú pháp thì Tuấn không vấp |

**Hệ quả:** KHÔNG bật chế độ thử thách kiểu "tự build từ đầu" — nó phá format quay. Thay vào đó ép
Tuấn **giải thích được VÌ SAO ở mức đủ để lên hình dạy lại người khác**; đó là thử thách đúng tầm và
đúng thứ series cần.

**Thêm vào mỗi bài từ Bài 02:** một mục lường trước **câu hỏi khán giả sẽ hỏi trong comment** — vừa
giúp Tuấn chủ động khi quay, vừa là cách ép Tuấn kiểm tra mình hiểu tới đâu.
- [ ] Khi tới Module 5 (thanh toán): hỏi Tuấn muốn Stripe (khách quốc tế/remote) hay VNPay/MoMo
      (khách VN) — ảnh hưởng lớn tới bài webhook.
