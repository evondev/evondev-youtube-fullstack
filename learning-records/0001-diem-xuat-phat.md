# Điểm xuất phát: frontend vững, backend từ 0

Tuấn xác nhận **chưa có nền backend thật** (các container NestJS/Postgres tồn tại trên máy là của dự
án người khác hoặc clone về chạy thử, không phải do Tuấn tự viết). Ngược lại, frontend
TypeScript/React/Next.js đã vững và Tuấn có gu kỹ thuật rõ ràng về chất lượng code.

**Ý nghĩa cho các bài sau:**

- **Bắc cầu từ frontend, không dạy lại lập trình.** Không cần dạy TypeScript, async/await ở mức cú
  pháp, npm, hay tư duy component. Cần dạy: cái gì xảy ra ở *phía server* — tiến trình, cổng, kết nối,
  trạng thái tồn tại lâu dài, đồng thời (concurrency).
- **Giữ nguyên Module 1 (viết server không framework).** Vì không có nền backend, đây là module quan
  trọng nhất để tránh biến thành người copy-paste NestJS.
- **Đề phòng ảo giác thành thạo.** Tuấn quen với việc code chạy được ngay trên frontend. Backend có cả
  lớp lỗi *không nhìn thấy được* (race condition, transaction, cache stale, webhook chạy 2 lần). Phải
  ép chứng minh bằng test/log thật, không tin cảm giác "chạy được rồi".
- Lộ trình chốt: **57 bài / 9 module**, không rút gọn (Tuấn chọn "chốt như vậy, bắt đầu luôn").
