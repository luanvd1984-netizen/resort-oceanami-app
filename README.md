# Resort Oceanami App

Ứng dụng quản lý villa, phí dịch vụ, hóa đơn và thông báo cho Resort Oceanami.

## Chạy local

```bash
npm install
cp .env.example .env
npm start
```

Mở `http://localhost:5000`.

## Cấu hình bắt buộc

Đặt `MONGODB_URI`, `JWT_SECRET` và `BOOTSTRAP_KEY` trong `.env`. `JWT_SECRET` và `BOOTSTRAP_KEY` phải là chuỗi bí mật đủ dài; không dùng giá trị mẫu khi triển khai thật. MongoDB phải đang chạy hoặc `MONGODB_URI` phải trỏ tới một MongoDB có thể truy cập.

## Bảo vệ API

- `POST /api/auth/login` và `POST /api/auth/bootstrap-residents` là các endpoint xác thực công khai; bootstrap vẫn yêu cầu `BOOTSTRAP_KEY`.
- `GET /api/health` là endpoint kiểm tra công khai.
- Các API còn lại yêu cầu header `Authorization: Bearer <token>`.
- Cư dân chỉ xem và đánh dấu đã đọc được thông báo thuộc villa của mình.

## Kiểm tra API

```bash
curl http://localhost:5000/api/health
```

API trả về `ok: true` khi server đã khởi động và kết nối MongoDB thành công.
