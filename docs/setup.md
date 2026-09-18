# Chạy bản thử nghiệm local
npm install
cp .env.example .env
npm start

# Sau khi MongoDB đã chạy, import villa thật
curl -X POST http://localhost:5000/api/villas/import-real

# Tạo tài khoản cư dân (dùng đúng BOOTSTRAP_KEY trong .env)
curl -X POST http://localhost:5000/api/auth/bootstrap-residents \
  -H 'Content-Type: application/json' \
  -d '{"key":"doi-khoa-khoi-tao","password":"123456"}'

# Tạo admin lần đầu: gọi endpoint /api/auth/bootstrap-admin với key trong .env
curl -X POST http://localhost:5000/api/auth/bootstrap-admin \
  -H 'Content-Type: application/json' \
  -d '{"key":"doi-khoa-khoi-tao","name":"Quản trị viên","username":"ADMIN","password":"doi-mat-khau-ngay"}'

Sau khi tạo admin và cư dân, đăng nhập tại http://localhost:5000.
