# Bài 01 — HTTP & node:http (2026-08-05)

## Chấm bài: ĐỌC file + CHẠY thật (rule A18)

### Lần nộp 1 — TRƯỢT một tiêu chí

`lab/01-bai-tap.mjs` trả đúng 3 endpoint `/`, `/ping`, `/echo` (kể cả `POST /echo` đọc đúng
`request.method`), nhưng:

| Đường dẫn | Kết quả |
|---|---|
| `/khong-ton-tai` | ❌ treo — `curl exit=28` |
| `/?q=1` | ❌ treo — `request.url === '/'` là **false** khi có query string |

→ Tự tay tạo lại đúng con bug ở phần 5 của chính bài học vừa đọc. Nguyên nhân gốc: **chỉ test đúng
những URL đề bài liệt kê**. Đã nói thẳng, yêu cầu revise ngay trước khi sang bài mới (rule A21).

Bom chưa nổ đã chỉ ra thêm: ba khối `if` không `return`/`else` — chạy đúng do các điều kiện tình cờ
loại trừ nhau, không phải do thiết kế đúng.

### Lần nộp 2 — ĐẠT

Thêm `return` vào mỗi nhánh + nhánh mặc định `response.end('Nothing')`. Chạy lại toàn bộ:

| `/` | `/ping` | `/echo` | `/khong-ton-tai` | `/?q=1` | `/ping?a=1` | đường dẫn rỗng | `POST /` |
|---|---|---|---|---|---|---|---|
| 200 ✅ | 200 ✅ | 200 ✅ | 200 ✅ | 200 ✅ | 200 ✅ | 200 ✅ | 200 ✅ |

**Không còn nhánh nào treo.** Definition of Done đạt.

## Nắm được

- Viết được HTTP server bằng `node:http` thuần, không framework.
- Hiểu "mọi nhánh phải kết thúc response" **sau khi tự vấp**, không phải do đọc lý thuyết — loại hiểu
  này bám lâu hơn nhiều.
- Đọc `request.method` / `request.url` đúng cách; không hardcode method.
- Tự đặt tên `request`/`response` theo convention riêng thay vì copy `req`/`res` — có gu, không copy mù.

## Còn yếu / theo dõi

- ⚠️ **Điểm yếu lần 1: chỉ test đúng "happy path" mà đề bài liệt kê.** Đây là điểm yếu backend kinh
  điển và rất dễ tái phát. **Nếu lặp lại ở bài sau → đổi cách can thiệp** (rule A21): bắt tự liệt kê
  danh sách ca test TRƯỚC khi viết code, thay vì nhắc lại lời nhắc cũ.
- `/?q=1` giờ trả `Nothing` thay vì trang chủ — **đúng theo đề** (chỉ yêu cầu luôn có response) nhưng
  sai về mặt ngữ nghĩa. Không tính là trượt; đây chính là chỗ bắc cầu sang Bài 02 (tách pathname khỏi
  query bằng `new URL()`).
- Mọi thứ vẫn trả `200`, kể cả đường dẫn không tồn tại → Bài 02 dạy status code sẽ sửa.

## Chưa có dữ liệu

- **Chưa trả lời câu quiz số 4 (dò nền)** dù đã hỏi 2 lần. Chưa quyết được Bài 02 đi nhịp chậm hay bật
  chế độ thử thách. Hỏi lại lần cuối ở đầu Bài 02; nếu vẫn không có, **mặc định giữ nhịp chậm** —
  nhưng dựa vào chất lượng bài này (vấp ở test coverage, không vấp ở cú pháp) thì hướng can thiệp đúng
  là **tăng độ khó ở phần TỰ KIỂM CHỨNG, không phải ở phần cú pháp**.

## Sự cố phụ

- Lúc chấm, tôi `pkill` nhầm con server Tuấn đang chạy ở cổng 3336. Đã báo ngay. Lần sau: kiểm cổng
  trước, dùng cổng khác để test thay vì giết tiến trình của người học.
- ESLint báo `not found by the project service` với file `.mjs` trong `lab/` → đã sửa bằng cách thêm
  `lab/**` vào `ignores` của `eslint.config.mjs`, và ghi luôn cách sửa + lý do vào bài học.
