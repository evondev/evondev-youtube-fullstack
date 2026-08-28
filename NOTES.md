# NOTES — Sổ tay người dạy

## Bối cảnh người học

- **Tuấn** (trananhtuan400@gmail.com), macOS, học bằng **tiếng Việt**.
- **Đã vững:** TypeScript, React, Next.js, Tailwind. Có CLAUDE.md global rất chi tiết về convention
  (feature-based folder, kebab-case file, `interface` > `type`, `cn()` cho className…) → người học
  **có gu kỹ thuật, quan tâm chất lượng code**, không phải người mới hoàn toàn với lập trình.
- **Backend (đã xác minh lại 2026-08-07 — đây là con số ĐÚNG, dùng cái này):**
  **"Có nghịch Express, chưa làm gì lớn"** — biết cú pháp cơ bản, từng làm theo tutorial / vài API route
  Next.js, nhưng **chưa tự thiết kế và vận hành thứ gì hoàn chỉnh**.
  - ⚠️ Con số cũ ("tự đánh giá chưa biết gì" + quiz Bài 01 chọn A) **là sai** — Tuấn cố ý chọn thấp để
    lấy nhịp cho khán giả. Đừng dùng lại.
  - **Hệ quả hiệu chỉnh:** đừng tiêu thời gian dạy **cú pháp** Node/Express (Tuấn có rồi, sẽ chán).
    Tiêu thời gian vào **bản chất · vì sao · đánh đổi · vận hành khi hỏng** — đúng chỗ Tuấn trống và
    cũng đúng mission (senior, tự ship & tự vận hành). Bài 02–03 đang đi đúng hướng này.

## Preferences đã ghi nhận

- Ghét học lý thuyết suông và ghét "học xong hết rồi mới làm dự án" → **mỗi bài phải chạm project
  e-learning**, dù chỉ một endpoint nhỏ.
- Muốn **hiểu bản chất & vì sao**, không học vẹt.
- 5–7h/tuần → bài ~40 phút, tự chứa.
- Mục tiêu: freelance/remote lương cao + tự làm startup → **thiên về "tự làm trọn vẹn & vận hành"**
  hơn là "luyện thi phỏng vấn". Vẫn giữ "Góc phỏng vấn" cho các khái niệm hay bị khách/nhà tuyển
  dụng hỏi — nhưng **gom vào CHƯƠNG CUỐI sau khi dự án xong** (Tuấn chốt 2026-08-07), không rải vào
  từng bài. Ưu tiên deploy thật, chi phí thật, vận hành thật hơn là bài mock LeetCode.

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
| Bài đã soạn | 12 (Bài 00 → Bài 11) |
| Cheat-sheet đã có | 3 — `docker-lenh-thiet-yeu.html` (Module 0) · `node-va-nestjs-tra-nhanh.html` (Bài 01→06) · **`nestjs-thuc-chien-tra-nhanh.html`** (Bài 05→10, soạn 2026-08-27 khi Module 2 xong) |
| Số bài KỂ TỪ cheat-sheet gần nhất | **1** (Bài 11) |
| **Trigger kế tiếp** | Bài 15 (đủ 5 bài kể từ cheat-sheet gần nhất), hoặc khi Module 3 xong — cái nào tới trước. Nội dung dự kiến: *Postgres + Prisma thực chiến*. |

## Việc cần làm / theo dõi

- [x] `git init` — đã làm, branch `main`. Chưa có remote → chỉ commit, chưa push.
- [x] Chấm bài tập Bài 01 — đạt sau 1 lần revise. Xem `learning-records/0003`.
- [ ] **Bài 02 đã soạn (2026-08-07), CHƯA commit** — theo rule, commit + push sau khi Tuấn xác nhận
      hoàn thành bài. Phần thuộc commit này: `lessons/0002-request-response.html`, `lessons/index.html`,
      `lessons/0001-*.html` (mở navbar), `NOTES.md`, `elearning-api/lab/02-*.mjs` (code Tuấn viết),
      + `learning-records/0004` và `GLOSSARY.md` (viết lúc chấm bài).
- [ ] **Bài 03 SOẠN TRƯỚC khi Tuấn học xong Bài 02** (2026-08-07, Tuấn yêu cầu: soạn sẵn để hôm sau quay
      cho trơn, khỏi phải cắt đoạn chờ trong lúc edit video). Hệ quả phải nhớ:
      - Bài 03 viết khi **chưa chấm Bài 02** → nếu lúc chấm lộ ra lỗ hổng, phải **quay lại chỉnh Bài 03**
        cho khớp trước khi Tuấn quay.
      - Bài 03 **chưa commit**. Thứ tự commit vẫn phải là: Bài 02 xong → commit+push Bài 02 → rồi mới
        commit Bài 03. Không gộp hai bài vào một commit.
      - `index.html`: Bài 03 để badge `soon` nhưng đã là link thật (đã soạn, chưa học tới).
- [x] ~~Can thiệp rule A21 bằng "Bước 0 nộp ca test"~~ → **ĐÃ GỠ 2026-08-07** (Tuấn bỏ bài tập để đi
      nhanh). Điểm yếu "chỉ test happy path" (record 0003) vẫn còn đó, chưa được xử lý — **theo dõi
      bằng cách khác**: khi review code Tuấn viết trong `src/`, chủ động chỉ ra ca chưa xử lý thay vì
      giao bài tập.

## 🎯 LỘ TRÌNH PHỤC VỤ TUẤN HỌC GIỎI LÊN — KHÔNG phục vụ việc quay video (Tuấn chốt 2026-08-07)

**Đây là rule cao nhất về thiết kế bài. Nếu nó mâu thuẫn với bất cứ ghi chú nào khác, nó thắng.**

Tuấn nói thẳng: *"lộ trình là thiết kế cho tôi học và giỏi lên, có win theo rule, chứ không phải để
quay video"*. Việc quay là **hệ quả**, không phải đầu vào của thiết kế.

**Đo độ khó theo `learning-records/` + teach-preferences (A3 ZPD, A12/A20 thử thách), TUYỆT ĐỐI không
theo "khán giả người mới".** Câu hỏi đúng luôn là *"cái này có làm Tuấn giỏi lên không?"* — không bao
giờ là *"khán giả có theo kịp không?"*.

### ❌ Ba thứ đã lái sai lộ trình trước 2026-08-07 (đã gỡ, đừng để mọc lại)

1. ~~"Nội dung bài để ở trình độ NGƯỜI MỚI vì khán giả phải làm theo được"~~ → **SAI**. Hạ trần độ khó
   của chính người học để phục vụ người xem. Giờ: độ khó bám ZPD của Tuấn.
2. ~~"KHÔNG bật chế độ thử thách vì nó phá format quay"~~ → **SAI, và tai hại nhất.** Đây là lấy lý do
   quay dựng để tắt hẳn rule A12/A20. Giờ: **bật chế độ thử thách bình thường** khi record cho thấy
   Tuấn đã vững phần đó. Format quay tự lo được.
3. ~~Mục "Góc lên hình / câu hỏi khán giả sẽ hỏi trong comment"~~ → **SAI**. Đã bỏ khỏi Bài 02
   (Tuấn nhắc 2 lần). Không thêm bất kỳ mục hỗ trợ quay dựng nào vào bài, dưới bất kỳ tên gì.

### ✅ Phần còn đúng — nhưng chỉ là HẬU CẦN, không được lái nội dung

- Tuấn **ghi hình ngay trong lúc học**, không có take 2 → **soạn xong bài HTML TRƯỚC khi Tuấn ngồi vào
  học** (Tuấn xác nhận lại 2026-08-07: soạn trước để hôm sau quay khỏi phải cắt đoạn chờ khi edit).
  Đây là lý do *thời điểm giao bài*, không phải lý do *hạ độ khó*.
- Trả lời trong chat nên **gọn, có cấu trúc**. Đây vốn cũng là cách trả lời tốt — giữ vì nó tốt, không
  phải vì nó lên hình.
- Chấm sai thì **nói thẳng ngay** (vốn đã là rule A10, không liên quan gì tới quay).

### ⚠️ Hệ quả cần xử lý: nền của Tuấn ĐANG BỊ GHI SAI

Ở quiz dò nền Bài 01, Tuấn **cố ý chọn A** ("chưa từng viết server Node") dù **thực tế đã từng viết
rồi** — chọn nhịp cho khán giả. Tức là input để tôi hiệu chỉnh lộ trình là input giả.
✅ **Đã hỏi lại và sửa 2026-08-07** — nền thật ghi ở mục "Bối cảnh người học" đầu file.
→ Module 1 **giữ nguyên số bài** (nền tutorial-level thì Bài 01–06 vẫn đáng học), nhưng **trọng tâm dịch
sang bản chất/vận hành thay vì cú pháp**.

### Chế độ thử thách (A12/A20) → **TUỲ CHỌN, không bắt buộc** (Tuấn chốt 2026-08-07)

Tuấn vừa học vừa quay YouTube thật, nên chốt: **chế độ thử thách là optional.** Không tự ý bật, không
coi việc thiếu nó là nợ kỹ thuật, không hỏi lại mỗi bài.
- **Mặc định:** giữ format hiện tại — bài giảng đầy đủ + siết ở phần **tự kiểm chứng** (nộp ca test
  trước khi code, tự thiết kế phép đo, tự giải thích vì sao). Phần siết này KHÔNG phải chế độ thử thách,
  cứ giữ vì nó đúng chỗ Tuấn yếu.
- **Chỉ bật chế độ thử thách đầy đủ khi TUẤN CHỦ ĐỘNG YÊU CẦU.** Lúc đó mới dùng cấu trúc A20 đầy đủ
  (đề + TC1..TCn + DoD + hint ladder + review 5 trục + lời giải sau cùng).
- ⚠️ Khác với lần trước: lần trước thử thách bị tắt vì *"phá format quay"* (lý do sai, đã gỡ). Lần này
  tắt vì **Tuấn chủ động chọn**, sau khi đã biết rõ nó là gì. Đây là quyết định của người học — tôn trọng.

### ⚡ TỐC ĐỘ > ĐẦY ĐỦ — bỏ bài tập, ưu tiên ra sản phẩm (Tuấn chốt 2026-08-07)

Tuấn: *"cần win nhanh để làm ra sản phẩm sớm vì thời gian không còn nhiều"*.

**KHÔNG soạn bài tập / "Bước 0 bắt buộc" / "đề bài" / "nộp kết quả" nữa.** Đã gỡ khỏi Bài 02, 03, 04.
- Win của mỗi bài = **gõ lại code trong bài và thấy nó chạy**, không phải làm thêm bài tập.
- **Quiz 5 câu cuối bài GIỮ NGUYÊN** — đó là phần tự kiểm, có phản hồi ngay, tốn 2 phút.
- Tuấn tự báo khi thấy lủng chỗ nào; không bắt nộp để chấm.
- Vẫn giữ: verify code chạy thật trước khi giao, nguồn chính chủ, comment tiếng Việt, điều hướng.

### 🎓 Ôn phỏng vấn = CHƯƠNG CUỐI, sau khi dự án e-learning xong (Tuấn chốt 2026-08-07)

**KHÔNG chèn "Góc phỏng vấn" vào từng bài** (đã định làm rồi Tuấn chặn lại — đừng làm nữa).
Gom thành **một chương riêng ở CUỐI lộ trình**, chạy *sau khi* dự án e-learning hoàn thành:
ôn tập + bài test đánh giá đã vững chưa + các câu nhà tuyển dụng/khách hay hỏi.
Lý do Tuấn muốn vậy: làm xong sản phẩm trước đã, ôn phỏng vấn là việc sau.

### 🔀 ĐỔI HƯỚNG LỘ TRÌNH — vào NestJS + dự án thật ngay (Tuấn chốt 2026-08-07)

Tuấn: *"vào làm dự án song song với kiến thức luôn, học kiến thức NestJS và giải thích rồi áp dụng
vào dự án e-learning"*.
- **Module 1 dừng ở Bài 04.** Graceful shutdown + thiết kế REST **hoãn lại** — kéo vào khi API cần
  deploy / đủ lớn. Đã đánh dấu `hoãn` trong `index.html`.
- **Bài 05 mới = NestJS: Module–Controller–Service + endpoint đầu tiên.** Nó **GỘP** 4 bài cũ
  (07 từ node:http tới Nest · 08 DI · 09 Controller · 10 Service) — vì Tuấn có nền Express, dạy tách
  4 bài là thừa. Module 2 đã đánh số lại 05→09; **các module sau sẽ dồn lên ~5 số**, chưa sửa trong
  `index.html` (sửa dần khi tới, đừng sửa một lượt cho tốn công).
- Đã verify Bài 05 chạy thật trong `src/` rồi **XOÁ đi** để Tuấn tự gõ lấy win — `git status` sạch.
  🐛 Bắt được lỗi thật khi verify: `TS1272` — interface dùng làm kiểu trả về trong signature có
  decorator **phải** `import type`. Đã viết thành callout trong bài.
- Từ đây **mỗi bài phải đắp một mẩu CHẠY ĐƯỢC vào `elearning-api/src/`**, hết thời kỳ `lab/`.
- Nhịp mỗi bài: *khái niệm NestJS → giải thích vì sao → áp thẳng vào e-learning*.

### 📌 Swagger — đã đề nghị chèn sớm, Tuấn nói KHÔNG (2026-08-25)

Đã hỏi có chèn Swagger/OpenAPI ngay sau Bài 07 không → Tuấn: *"cứ theo hiện tại thôi"*.
**Giữ nguyên lộ trình, đừng đề nghị lại.** Khi nào tới phần "tài liệu API" theo MISSION thì làm,
hoặc khi Tuấn chủ động hỏi.

### 🔤 CODE VIẾT TIẾNG ANH — chỉ COMMENT là tiếng Việt (Tuấn chốt 2026-08-26)

Tuấn: *"code mọi thứ in english nha, chứ đừng level co ban nang cao nó kì lắm"*.

**Tiếng Anh:** tên biến/hàm/class · giá trị enum (`'beginner' | 'advanced'`, KHÔNG phải `'co-ban'`) ·
route (`/fast` không phải `/nhanh`) · tên file code · chuỗi log · thông báo lỗi API · dữ liệu mẫu
(tên khoá học...).
**Tiếng Việt:** comment trong code + toàn bộ phần giảng giải.

⚠️ **Tiếng Việt trong code block phải CÓ DẤU ĐẦY ĐỦ** (Tuấn nhắc 2026-08-26). Đừng viết kiểu
`Doc @Module -> thay providers` / `Tao MOT the hien` — chữ giải thích thì viết *"Đọc @Module → thấy
providers"*, *"Tạo MỘT thể hiện"*. Áp cho cả comment, sơ đồ mô tả bằng lời, và chú thích `#` trong
khối bash. Chỉ **output thật của máy** mới giữ nguyên văn.
Dùng luôn ký tự mũi tên/khung thật (`→ ← │ ▼ └──`) thay cho `->` `|` `v` `+--` cho dễ đọc.

⚠️ **Đổi tên là output đổi theo** → phải CHẠY LẠI thật rồi dán output mới, không được sửa chữ suông.
Đã làm đúng vậy khi sửa Bài 02–06 + cheat-sheet ngày 2026-08-26 (số liệu mới: body 5 byte→1 khúc,
5MB→82 khúc, /fast 0.016s vs 2.710s, 5x /io 3.04s vs 5x /cpu 15.03s).

Ghi chú: thông báo lỗi API cũng chuyển sang tiếng Anh (trước đó Bài 06 cố ý viết tiếng Việt và có hẳn
callout giải thích). Callout đó đã viết lại thành *"vì sao tự viết message thay vì để mặc định"*, và
nói rõ dịch cho người dùng cuối là việc của tầng i18n ở client.

### ✅ Bài 07–09 đã soạn trước (2026-08-26) — verify trong BẢN COPY

Tuấn yêu cầu soạn sẵn 07+08+09 để học một lần. Đã verify toàn bộ trong
`scratchpad/b07` (copy project + symlink node_modules), **không đụng `src/` của Tuấn** — đúng rule dưới.
- **Bài 07** exception filter: 5 nguồn lỗi → 1 khuôn; `SuperSecret123` KHÔNG lộ ra client nhưng log giữ đủ stack.
- **Bài 08** config: `.env` sai → `exit=1`, liệt kê hết lỗi, app không lên. `@nestjs/config` ^4.0.4.
- **Bài 09** request-id: `AsyncLocalStorage`, tôn trọng `x-request-id` client gửi, id vào cả body lỗi lẫn log.
- Cả ba nối thành một mạch: hình dạng lỗi (07) → biết mình chạy ở đâu (08) → truy vết được là ai (09).
- ⚠️ Bài 07 có route `boom` TẠM để demo 500 — bài đã dặn Tuấn xoá sau khi thử. Nhắc lại lúc chấm.

### 🗄️ Module 3 bắt đầu — Bài 11 (2026-08-27)

**Câu trả lời của Tuấn cho câu hỏi tư duy Bài 10:** *"lưu ở khoá học nhé"* → đúng một nửa. Đã dùng
chính câu đó làm xương sống Bài 11 (snapshot giá trong `order_items`). Tuấn chưa nghĩ tới dữ liệu
sự kiện vs dữ liệu trạng thái — đây là chỗ trống đáng ghi nhận, không phải lỗi.

**Bài 11 dùng SQL THUẦN, chưa dùng Prisma** — cố ý, lặp lại mô hình Module 1→2 đã hiệu quả:
thấy tầng dưới trước thì Prisma (Bài 12) mới là tiện nghi chứ không phải hộp đen.

Đã verify THẬT trên Postgres 18.4 của Tuấn (tạo DB tạm `elearning_verify`, xong DROP; DB `elearning`
của Tuấn vẫn 0 bảng, không đụng vào):
- 6 bảng tạo OK; 8 ràng buộc đều chặn đúng (unique, FK, check, identity ALWAYS, RESTRICT)
- Màn chứng minh: giảm giá 499k→199k + đổi tên khoá → hoá đơn cũ VẪN ghi 499k và tên cũ
- `0.1+0.2` numeric = `0.3` vs float = `0.30000000000000004` → lý do dùng NUMERIC cho tiền
- ⚠️ Mật khẩu Postgres đúng là `elearning_dev_pw` (trong docker-compose.yml), KHÔNG phải `elearning`

**Module 3 đã đánh số lại trong `index.html`:** 11 schema · 12 Prisma · 13 N+1 · 14 index ·
15 phân trang · 16 transaction · 17 migration an toàn. Bài "khoá chính/ngoại, 1-n, n-n" cũ đã bị
Bài 11 nuốt trọn nên bỏ; phần *index* tách ra thành Bài 14 riêng vì nó là chuyện hiệu năng.

### 📗 Bài 10 (pino) — THÊM theo yêu cầu Tuấn (2026-08-27)

Tuấn: *"tôi thấy pino hay mà, bro đưa vào tôi học luôn"*. Bài 09 vốn có callout nói "chưa đưa pino vào";
giờ tách thành **Bài 10** riêng thay vì nhét thêm vào Bài 09 (giữ rule mỗi bài một thứ).
- Phiên bản đã verify: `nestjs-pino ^4.6.1` · `pino ^10.3.1` · `pino-http ^11.0.0` · `pino-pretty ^13.1.3` (dev).
- **Điểm bán hàng chính là `redact`** (che secret trong log), không phải JSON — nó nối thẳng vào bài
  "đừng rò rỉ" ở Bài 07 và là thứ Tuấn dùng thật khi làm freelance.
- Đã verify thật: `authorization` → `[DA CHE]`, `*.password` che cả object lồng nhau, `grep` mật khẩu = 0.
- Dev dùng `pino-pretty` + `messageFormat: '[{req.id}] [{context}] {msg}'`; production JSON thuần.
  `NODE_ENV` từ Bài 08 quyết định — khép vòng rất đẹp.
- ✅ Xác nhận từ README nestjs-pino: nó dùng **AsyncLocalStorage** bên dưới → bản thủ công Bài 09 của
  Tuấn không phí, đó đúng cách thư viện công nghiệp làm. Bài 10 nói thẳng điều này.
- ⚠️ Bài 10 có dặn Tuấn rằng middleware + AppLogger của Bài 09 thành thừa, NHƯNG giữ
  `request-context.ts` vì filter Bài 07 còn gọi `getRequestId()` cho body lỗi.

### 🛑 TUYỆT ĐỐI KHÔNG VERIFY TRONG `elearning-api/src/` — đã XOÁ CODE CỦA TUẤN (2026-08-26)

**Sự cố thật:** Tuấn viết `src/courses/` lúc 19:47–20:09 **trong lúc tôi đang làm việc**. Tôi cũng tạo
`src/courses/` cùng tên để verify bài, rồi `rm -rf src/courses` để "dọn của mình" → **xoá luôn của Tuấn**.
Kèm theo `git checkout -- src/app.module.ts` xoá nốt dòng import `CoursesModule` Tuấn đã thêm.
Đã khôi phục được **toàn bộ** từ VS Code local history
(`~/Library/Application Support/Code/User/History/*/entries.json`).

**Quy tắc cứng từ giờ:**
1. **KHÔNG tạo/sửa/xoá bất cứ gì trong `elearning-api/src/`.** Muốn verify code bài NestJS thì
   `cp -R` project sang scratchpad rồi làm ở đó. Chậm hơn vài giây, đổi lại không phá code người học.
2. **KHÔNG `rm -rf` theo tên thư mục** trong workspace của Tuấn. Tên trùng nhau là chuyện bình thường —
   bài học bảo Tuấn tạo đúng thư mục đó.
3. **KHÔNG `git checkout --` / `git restore` file nào Tuấn có thể đã sửa.** `git status` lúc đầu phiên
   ĐÃ báo `M src/app.module.ts` + `?? courses/` — dấu hiệu rõ ràng mà tôi bỏ qua.
4. **Đọc `git status` đầu phiên như bản đồ "vùng cấm"**: mọi file `M`/`??` là việc đang dở của Tuấn.
5. Nhớ: **Tuấn vừa học vừa gõ song song với tôi.** Workspace không bao giờ là của riêng tôi.

### 🚦 Khi Tuấn bảo "soạn bài mới" → SOẠN LUÔN (Tuấn chốt 2026-08-07)

**Không hỏi lại "tại sao", không chất vấn thứ tự, không đòi điều kiện tiên quyết** (kiểu "bài trước chưa
chấm xong thì chưa soạn bài mới"). Tuấn tự biết mình đang cần gì.
- Vẫn giữ nguyên các rule về CHẤT LƯỢNG bài: verify code chạy thật trước khi giao (A19), trích nguồn
  chính chủ (A6), mỗi bài một win (A2), cập nhật `index.html` + điều hướng (B.2).
- Nếu có rủi ro thật (vd bài mới phụ thuộc kiến thức bài chưa học) thì **nói một câu rồi vẫn soạn**,
  không dừng lại chờ trả lời.
- [ ] Khi tới Module 5 (thanh toán): hỏi Tuấn muốn Stripe (khách quốc tế/remote) hay VNPay/MoMo
      (khách VN) — ảnh hưởng lớn tới bài webhook.
- [ ] Khi tới Module 5 (thanh toán): hỏi Tuấn muốn Stripe (khách quốc tế/remote) hay VNPay/MoMo
      (khách VN) — ảnh hưởng lớn tới bài webhook.

### 🗃️ THÊM MODULE 3.5 — SQL THUẦN (Tuấn yêu cầu 2026-08-28)

Tuấn nói: *"kiến thức SQL thuần tôi chưa có, nghe nói nó cũng quan trọng cho backend dev,
có gì sau này bro bổ sung tôi 1 module dạy tôi nha"*.

→ Đã chèn **Module 3.5** vào `lessons/index.html`, dùng đúng 4 số còn trống 18–21 (giữa Module 3
kết ở Bài 17 và Module 4 mở ở Bài 22 — khe này vốn đã bỏ trống, không phải đánh số lại gì cả):

| Bài | Nội dung |
|-----|----------|
| 18 | SELECT/WHERE/ORDER BY/LIMIT + JOIN |
| 19 | GROUP BY + hàm tổng hợp → báo cáo doanh thu |
| 20 | Subquery, CTE (`WITH`), window function |
| 21 | Khi nào thoát ORM: `$queryRaw`, tham số hoá, SQL injection |

**Vị trí có chủ ý:** đặt SAU Prisma (Module 3) chứ không trước. Học Prisma xong rồi mới thấy rõ
chỗ ORM bó tay, lúc đó SQL thuần mới có động lực học. Dạy SQL trước Prisma là dạy lý thuyết suông.

⚠️ Dạy trên **chính 6 bảng của Bài 11** (đã có dữ liệu thật), không dùng bảng ví dụ `employees` vớ vẩn.

### 📌 Bài 11 — sửa sau khi Tuấn phản hồi (2026-08-28)

Callout `NUMERIC` vs `float` chỉ ghi câu `SELECT ...` trần → Tuấn hỏi **"chạy ngay vào đâu nhỉ"**.
Lỗi của tôi: callout nằm ở §3, mà §4 mới dạy cách kết nối psql.
→ Đã sửa thành **lệnh bash đầy đủ dán thẳng vào Terminal** (kèm `PGPASSWORD=`), và tách output
thành khối riêng đúng dạng bảng psql thật.

**Rule rút ra:** mọi callout "chạy thử ngay" phải TỰ ĐỦ — lệnh đầy đủ copy-paste chạy được,
không phụ thuộc mục phía sau. Người học đọc tới đâu chạy tới đó, không đọc trước.

### 🛠️ THÊM MODULE 9 — DEVOPS & HẠ TẦNG (Tuấn yêu cầu note 2026-08-28)

Tuấn: *"dự án này sau này còn có docker, ci cd, tôi cũng chưa biết gì... nghe nói còn có devops
như k8s, monitoring, IaC, AWS basis, basic linux gì nữa ấy... chưa cần soạn giờ cũng được note lại thôi"*.

→ Đã chèn **Module 9** vào `lessons/index.html`, Bài 57–63 (nối tiếp Module 8 kết ở Bài 56):

| Bài | Nội dung |
|-----|----------|
| 57 | Linux cho backend: shell, quyền, process, port, systemd, đọc log |
| 58 | Docker hiểu sâu: layer, volume, network, compose nhiều service |
| 59 | CI/CD nâng cao: cache, matrix, secret, staging → production |
| 60 | AWS căn bản: IAM, EC2, RDS, S3, VPC/security group + hoá đơn |
| 61 | IaC với Terraform: plan/apply, state để ở đâu |
| 62 | Kubernetes: pod/deployment/service/ingress — và khi nào KHÔNG cần |
| 63 | Monitoring & alert: Prometheus + Grafana, SLO, alert không gây mù |

**CHƯA SOẠN — chỉ ghi nhận.** Tuấn nói rõ "chưa cần soạn giờ".

---

#### ⚠️ MÂU THUẪN THỨ TỰ CẦN GIẢI QUYẾT TRƯỚC KHI TỚI MODULE 7

Tuấn nói **chưa biết gì về Docker**, nhưng lộ trình hiện tại đã dùng Docker từ **Bài 00**
(Postgres container) và **Bài 46–48** (Dockerfile production, CI/CD, deploy) nằm ở Module 7 —
tức là **trước** Module 9 nơi Docker mới được dạy tử tế. Không sửa thì Bài 46 sẽ hụt nền.

**Cách xử lý đã chốt (đừng nghĩ lại từ đầu):** KHÔNG đánh số lại. Khi Tuấn tới gần Module 7:
1. Kéo **Bài 57 (Linux)** và **Bài 58 (Docker sâu)** lên học TRƯỚC Bài 46 — nội dung giữ nguyên,
   chỉ đổi thứ tự học. Mục lục ghi chú "học sớm nếu cần".
2. Phần còn lại của Module 9 (AWS, Terraform, k8s, monitoring) vẫn để cuối — đó là hạ tầng
   *sau khi* app đã chạy được, không phải điều kiện tiên quyết.

Hiện đã có `reference/docker-lenh-thiet-yeu.html` (Module 0) đỡ tạm phần lệnh, nhưng đó là
cheat-sheet tra cứu, KHÔNG thay được bài dạy layer/volume/network.

---

#### 📍 Trật tự chương cuối (cập nhật)

Module 9 (DevOps) → rồi mới tới **chương ôn phỏng vấn** (rule 2026-08-07: gom vào cuối,
sau khi dự án e-learning xong). Chương phỏng vấn vẫn CHƯA đưa vào `index.html` — cố ý,
vì nội dung của nó phụ thuộc vào việc Tuấn thực sự yếu chỗ nào lúc đó.

### 🎨 FIX UI MỤC LỤC + ĐỒNG BỘ STYLE RA GLOBAL (2026-08-28)

**Bug Tuấn phát hiện:** dòng mục lục nào có `<code>` hoặc `<em>` trong tiêu đề thì chữ **vỡ vụn
thành từng mảnh** (xem Bài 57 `systemd`, Bài 62 `<em>không</em>`).

**Nguyên nhân thật:** `.lessons-list a` để `display:flex`, mà tiêu đề là **text trần** — CSS gói
mỗi đoạn text trần thành một *anonymous flex item*, nên `<code>` và `<em>` trở thành flex item
RIÊNG, tự xuống dòng độc lập. Không phải lỗi wrap, là lỗi cấu trúc flex.

**Cách sửa (đã áp dụng):** bọc tiêu đề trong `<span class="ltitle">` → cả tiêu đề là MỘT flex item,
thẻ inline bên trong chảy chữ bình thường. Kèm `align-items: baseline`, `.badge{align-self:flex-start}`,
và media query ≤720px cho `.lcount` xuống dòng thay vì bóp tiêu đề. Đã bọc **69 dòng** trong
`lessons/index.html`, kiểm lại HTML không lỗi lồng thẻ.

🔴 **RULE VĨNH VIỄN:** mọi dòng `.lessons-list` phải có `<span class="ltitle">` bọc tiêu đề,
KỂ CẢ khi tiêu đề không có thẻ inline nào. Thêm bài mới mà quên là vỡ lại.

**Đã đẩy ra global** (`~/.claude/teach-assets/`) để khoá /teach sau khỏi lặp lại:
- `lesson.css` — sync bảng màu **Poimandres** từ project, giữ nguyên 2 khối chỉ global mới có
  (`::selection` và `.code-block.prose`). Giờ `diff` global vs project = **giống hệt**.
- `INDEX-TEMPLATE.html` — vá `.lessons-list` (ltitle + baseline + media query), đổi màu badge
  sang Poimandres, và sửa luôn 2 dòng mẫu `<li>` thành có sẵn `.ltitle`.
- `LESSON-TEMPLATE.html`, `lesson-enhance.js` — đã grep, không còn mã màu bảng cũ, không cần sửa.

### ⌨️ TUẤN CHƯA NẮM DÒNG LỆNH — cần cheat-sheet "đọc hiểu khối copy-paste" (2026-08-28)

Tuấn: *"mấy cú pháp mà bro hướng dẫn tôi copy paste này tôi thấy cũng hay, kể cả CURL tôi cũng
chưa nắm, note lại sau này dạy cho tôi nha"*.

**Đây là lỗ hổng ĐANG ẢNH HƯỞNG NGAY**, khác với Module 9 (kiến thức tương lai). Từ Bài 02 tới giờ
bài nào cũng bảo Tuấn dán `curl ...` / `psql ...` mà chưa bài nào giải thích cú pháp — anh đang
copy-paste mà không đọc được mình đang chạy gì.

**Nội dung cần có** (rút thẳng từ những khối anh đã dán suốt Module 1–3):
- `curl`: `-s` im lặng, `-i` xem header, `-X POST`, `-H 'Content-Type: ...'`, `-d '{...}'`,
  `-o /dev/null`, `-w '%{http_code}'`, và **exit code** (7 = không kết nối được, 52 = server chết giữa chừng)
- `psql`: `-h -p -U -d`, `-c` chạy một câu, `-f` chạy file, meta-command `\dt` `\d+ bảng` `\q`
- **`VAR=giá_trị lệnh`** — gán biến chỉ cho MỘT lệnh (vì sao `PGPASSWORD=... psql` khác `export`)
- **Nháy đơn vs nháy kép** — vì sao JSON trong `-d` phải nháy đơn bọc ngoài
- **Heredoc** `<<'SQL' ... SQL` — vì sao nháy quanh `'SQL'` chặn shell nội suy `$`
- `|` pipe, `>` `>>` chuyển hướng, `2>&1`, `xargs -P5` (đã dùng ở Bài 09 để bắn 5 request song song)
- `$?` đọc exit code, `&&` vs `;`

**Vị trí:** cheat-sheet ở **Module 0** (tra cứu bất cứ lúc nào), KHÔNG phải bài đánh số — vì nó
phục vụ ngược lại các bài đã học rồi. Đã thêm dòng "sắp tới" vào `lessons/index.html` Module 0.
Sau này Bài 57 (Linux) sẽ đào sâu; cheat-sheet này chỉ để đọc được khối copy-paste.

✅ **ĐÃ SOẠN NGAY 2026-08-28** — tôi đề nghị làm sớm thay vì để tới Bài 57, Tuấn đồng ý:
*"copy dán mù mà ko hiểu khá nguy hiểm"*. File: `reference/dong-lenh-tra-nhanh.html`, 10 mục,
đã nối vào Module 0 trong `index.html`.

**Đã chạy thật 100% số liệu trong trang** (không con số nào bịa):
- curl exit 7 (cổng không ai nghe) · 52 (server chết giữa chừng) — dựng server Node giả để ép ra
- `-w 'code=%{http_code} time=%{time_total}s size=%{size_download}'` → `code=200 time=0.000767s size=11`
- **Demo đắt nhất:** dựng server echo, POST cùng một JSON hai lần chỉ khác nháy bọc ngoài.
  Nháy đơn → server nhận `{"title":"NestJS","price":499000}`. Nháy kép → nhận `{title:NestJS}`
  (mất sạch dấu `"`). Kèm cảnh báo: lỗi này khiến người ta đi sửa DTO/pipe trong khi API không hề sai.
- Quên `-H Content-Type` → curl mặc định khai `application/x-www-form-urlencoded` (đã kiểm) → Nest 400
- `MY_TOKEN=abc123 sh -c ...` in `abc123`, lệnh sau in rỗng — chứng minh biến chết theo lệnh
- heredoc `<<'END'` giữ nguyên `$PRICE và $(date +%Y)`; `<<END` cho ra `499000 và 2026`
- `ls file-khong-co > out.txt 2>&1` → exit 1, lỗi VÀO file (giải thích stdout=1, stderr=2)
- `xargs -P1` = **5.132s** vs `-P5` = **1.028s** (server giả chờ 1 giây/request) — nối thẳng về Bài 03
- psql `\dt` trên DB thật của Tuấn: đủ 6 bảng · sai mật khẩu → exit **2**
- Đã kiểm `lsof`, `docker ps --filter name=elearning-postgres` (Up 3 weeks, healthy) chạy được trên máy

**Mục 10 "Khi kẹt — 4 câu hỏi theo thứ tự"** là phần đáng giá nhất: dạy cách khoanh vùng lỗi
(exit code nói về ĐƯỜNG TRUYỀN, status code nói về ỨNG DỤNG) thay vì đoán mò.

### ✅ BÀI 12 — Prisma 7: nối API vào database thật (soạn 2026-08-28)

Tuấn báo học xong Bài 11 → soạn tiếp ngay. Bài trả lời đúng 2 câu hỏi Bài 11 để lại
(migration + `_prisma_migrations` = "git cho cấu trúc database").

**Verify trong DB tạm `elearning_b12` (đã DROP; DB `elearning` của Tuấn vẫn 6 bảng, 1 khoá học).**
Bản sao code ở scratchpad, repo Tuấn không bị đụng.

🔴 **Prisma 7 KHÁC HẲN mọi bài hướng dẫn trên mạng — 4 điểm đã đâm thật:**
1. `npm i prisma@latest` → **8.0.0-rc.12** (bản rc!) trong khi `@prisma/client` ra 7.10.0 → lệch phiên
   bản. PHẢI ghim `prisma@7 @prisma/client@7`.
2. **Driver adapter bắt buộc.** `super()` trống → chết lúc khởi động:
   `PrismaClientInitializationError: ... A driver adapter is required`. Cần `@prisma/adapter-pg`.
3. Client sinh vào **`src/generated/prisma`** (không phải `node_modules`) → import từ đường dẫn tương đối,
   KHÔNG từ `@prisma/client`. Type của model là `CourseModel`, không phải `Course`.
4. `migrate diff` đổi cờ `--to-schema-datamodel` → **`--to-schema`** (gõ tên cũ là báo lỗi).
   Ngoài ra `prisma init` còn vứt rác `.agents/ .windsurf/ .claude/ skills-lock.json`.

**Ba khoảnh khắc dạy học đắt nhất (đều là kết quả thật):**
- `db pull` cảnh báo **không hiểu 5 CHECK constraint** → rồi mục 8 chứng minh chúng VẪN chặn:
  gỡ `@IsIn` khỏi DTO, POST `level='trung-cap'` → `violates check constraint "courses_level_check"`.
  Đây là bằng chứng sống cho luận điểm cốt lõi của Bài 11.
- `TypeError: Do not know how to serialize a BigInt` → và **filter Bài 07 + log Bài 09/10 bắt trọn**,
  app không sập, có requestId để lần. Hạ tầng làm trước bắt đầu trả lãi — đã nêu rõ trong bài.
- `UPDATE` bằng psql rồi curl lại **không restart** → thấy giá mới ngay. Bằng chứng dứt điểm là DB thật.

⚠️ **Phát hiện trung thực đã đưa vào bài:** migration Prisma sinh ra **YẾU HƠN** `schema.sql` Tuấn viết —
đếm thật trong `0_init/migration.sql`: giữ 6 FK, 3 CASCADE, 3 RESTRICT, 4 UNIQUE nhưng **mất cả 5 CHECK**
và `GENERATED ALWAYS AS IDENTITY` → `BIGSERIAL` (tự gán id được trở lại). Trên DB hiện tại thì 5 CHECK
vẫn còn (migrate chỉ chạy `ALTER TABLE ADD COLUMN`, đã kiểm lại `pg_constraint`), nhưng ai dựng mới bằng
`migrate deploy` sẽ có DB yếu hơn mà không ai nhận ra. Bài chỉ cách xử lý: **sửa tay file migration**,
và nối thẳng sang Module 3.5 (SQL thuần).

**Nhắc Tuấn 2 việc dọn:** xoá route `@Get('boom')` (còn sót từ Bài 07) · `.gitignore` thêm
`src/generated/`, GIỮ `prisma/migrations/` trong git.

Bắc cầu Bài 13: đặt sẵn đoạn code N+1 (`findMany` rồi `for` gọi `lesson.findMany`) — 3 khoá = 4 truy vấn,
500 khoá = 501 truy vấn.

#### 📌 Bài 12 — bổ sung sau khi Tuấn hỏi (2026-08-28)

Tuấn hỏi: đổi tên ở `lessons / orderItems / enrollments` (phần bên phải) có ảnh hưởng gì không?
Câu hỏi rất đúng chỗ — bài chỉ dặn sửa `currentPrice`/`createdAt` mà không nói ba dòng kia là gì.

Đã kiểm bằng máy, thêm 2 callout vào mục 4:
- **Field quan hệ KHÔNG phải cột** → không cần `@map`. Chứng minh bằng `migrate diff` giữa hai schema
  chỉ khác tên field quan hệ → `-- This is an empty migration.`
- **Đối chứng đáng sợ:** bỏ `@map` khỏi `currentPrice` → `ALTER TABLE DROP COLUMN "current_price"`,
  tức MẤT DỮ LIỆU. Đây là lý do field thật bắt buộc có `@map`.
- **Trái vs phải:** tên field bên trái tự do (thử tên vô nghĩa → vẫn `valid 🚀`); tên MODEL bên phải
  phải khớp chính xác (`Type "order_items" is neither a built-in type...`, P1012).
- Dặn chạy `npx prisma validate` sau mỗi lần sửa schema.
