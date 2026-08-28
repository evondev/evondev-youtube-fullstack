-- ══════════════════ NGƯỜI DÙNG ══════════════════
CREATE TABLE users (
  -- GENERATED ALWAYS AS IDENTITY: Postgres tự cấp id, và CẤM ta tự gán.
  -- Cấm là có chủ ý — tự gán tay là nguồn gốc của id trùng.
  id         BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT        NOT NULL UNIQUE,
  full_name  TEXT        NOT NULL,
  -- TIMESTAMPTZ (có múi giờ), KHÔNG dùng TIMESTAMP trần.
  -- Server ở Singapore, khách ở VN — thiếu múi giờ là lệch 1 tiếng, âm thầm.
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ══════════════════ KHOÁ HỌC ══════════════════
CREATE TABLE courses (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title         TEXT   NOT NULL,
  -- CHECK = ràng buộc sống trong DATABASE, không phải trong code.
  -- Ai ghi thẳng bằng psql cũng bị chặn — DTO ở Bài 06 không làm được điều đó.
  level         TEXT   NOT NULL CHECK (level IN ('beginner', 'advanced')),
  -- Tên là current_price chứ không phải price: nói rõ đây là giá HÔM NAY.
  -- NUMERIC cho tiền, tuyệt đối không dùng float (xem cảnh báo bên dưới).
  current_price NUMERIC(12,0) NOT NULL CHECK (current_price >= 0),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ══════════════════ BÀI HỌC (1 khoá — n bài) ══════════════════
CREATE TABLE lessons (
  id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- ON DELETE CASCADE: xoá khoá thì bài học trong đó đi theo.
  -- Hợp lý vì bài học KHÔNG tồn tại độc lập với khoá.
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title     TEXT   NOT NULL,
  position  INT    NOT NULL,
  -- Trong CÙNG một khoá không được có hai bài cùng vị trí.
  UNIQUE (course_id, position)
);

-- ══════════════════ ĐƠN HÀNG (1 user — n đơn) ══════════════════
CREATE TABLE orders (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- ON DELETE RESTRICT: CẤM xoá user còn đơn hàng.
  -- Sổ sách kế toán không được phép bốc hơi vì ai đó bấm nhầm nút xoá.
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status      TEXT   NOT NULL CHECK (status IN ('pending','paid','refunded')),
  total_price NUMERIC(12,0) NOT NULL CHECK (total_price >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══════════ DÒNG ĐƠN HÀNG — ĐÂY LÀ CHỖ CHỤP ẢNH ═══════════
CREATE TABLE order_items (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id     BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  course_id    BIGINT NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  -- HAI DÒNG DƯỚI LÀ TRỌNG TÂM CẢ BÀI.
  -- Chúng SAO CHÉP giá và tên tại thời điểm mua, thay vì trỏ sang courses.
  -- Trông như dữ liệu thừa — nhưng đây là dữ liệu KHÁC BẢN CHẤT, xem phần 5.
  course_title TEXT   NOT NULL,
  unit_price   NUMERIC(12,0) NOT NULL CHECK (unit_price >= 0),
  -- Một đơn không được chứa cùng một khoá hai lần.
  UNIQUE (order_id, course_id)
);

-- ══════════════ GHI DANH (n — n) ══════════════
CREATE TABLE enrollments (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id   BIGINT NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Trái tim của bảng n-n: một người KHÔNG ghi danh hai lần cùng một khoá.
  -- Thiếu dòng này là bug "mua hai lần" mà code rất khó chặn cho kín.
  UNIQUE (user_id, course_id)
);