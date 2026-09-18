# Resort Oceanami

Ứng dụng quản lý cư dân và thu phí cho Resort Oceanami.

## Trạng thái hiện tại
Đây là **bản khung backend ban đầu**, chưa phải sản phẩm triển khai thực tế. Đã chuẩn bị:
- Quản lý villa, chủ villa và diện tích m².
- Cấu hình đơn giá theo m², kWh, m³ hoặc cố định.
- Lưu hóa đơn theo từng tháng để tra cứu lịch sử.
- Các điểm API ban đầu cho thông báo, tin nhắn, góp ý và thanh toán.

## Chạy thử backend
1. Cài Node.js 18+ và MongoDB.
2. Sao chép `.env.example` thành `.env`, rồi điều chỉnh `MONGODB_URI` và `JWT_SECRET`.
3. Chạy `npm install`.
4. Chạy `npm run dev` hoặc `npm start`.
5. Mở `http://localhost:5000`.

## Lưu ý quan trọng
- Chưa đưa dữ liệu thật, mật khẩu thật hoặc thông tin ngân hàng vào repository.
- Chưa kết nối QR ngân hàng; cần xác định ngân hàng/cổng thanh toán và quy trình đối soát.
- Trước khi dùng thật cần bổ sung đăng nhập, phân quyền, kiểm tra dữ liệu, sao lưu, nhật ký thao tác và giao diện web/mobile.

## Dữ liệu cần cung cấp ở bước tiếp theo
Danh sách villa, diện tích, chủ sở hữu, bảng giá phí quản lý/bảo trì, kỳ thu và thông tin tài khoản nhận tiền.
