# Backend Node.js / NestJS Glossary

Ngôn ngữ chuẩn của khoá học này. Chỉ thêm term khi Tuấn đã **dùng đúng**, không phải khi vừa được
giới thiệu. Mọi bài học và learning-record phải dùng đúng các từ ở đây.

## Hạ tầng & tiến trình

**Cổng (port)**:
Con số định danh một điểm lắng nghe trên máy; mỗi cổng chỉ thuộc về đúng một tiến trình tại một thời điểm.
_Avoid_: port number, số hiệu

**EADDRINUSE**:
Lỗi Node báo cổng cần lắng nghe đã bị tiến trình khác chiếm giữ.
_Avoid_: lỗi trùng port

**Container**:
Một tiến trình chạy cô lập kèm theo toàn bộ hệ điều hành thu nhỏ và thư viện nó cần.
_Avoid_: máy ảo, VM (khác bản chất — container dùng chung nhân hệ điều hành với máy chủ)

**Volume**:
Ổ đĩa do Docker quản lý, tồn tại độc lập với vòng đời container — là thứ giữ dữ liệu sống sót khi container bị xoá.
_Avoid_: ổ đĩa gắn ngoài, mount

**Healthcheck**:
Lệnh Docker chạy định kỳ bên trong container để phân biệt "container đang chạy" với "dịch vụ đã sẵn sàng nhận kết nối".
_Avoid_: ping, kiểm tra sống

> Làm rõ: trong khoá này, **"Up"** luôn nghĩa là container đang chạy, còn **"healthy"** nghĩa là dịch vụ
> bên trong đã sẵn sàng. Hai thứ này không bao giờ được dùng thay nhau.
