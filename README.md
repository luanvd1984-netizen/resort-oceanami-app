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

Đặt `MONGODB_URI`, `JWT_SECRET` và `BOOTSTRAP_KEY` trong `.env`. Không dùng giá trị mẫu khi triển khai thật. MongoDB phải đang chạy hoặc `MONGODB_URI` phải trỏ tới một MongoDB có thể truy cập.

## Kiểm tra API

```bash
curl http://localhost:5000/api/health
```

API trả về `ok: true` khi server đã khởi động và kết nối MongoDB thành công.
