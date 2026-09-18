<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Oceanami</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div id="appRoot" class="dashboard-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="logo">O</div>
          <div>
            <div class="label">Oceanami</div>
            <strong>Admin</strong>
          </div>
        </div>

        <nav class="nav-list">
          <button class="nav-item active" data-panel="home">Trang chủ</button>
          <button class="nav-item" data-panel="staff">Nhân viên</button>
          <button class="nav-item" data-panel="villa">Villa</button>
          <button class="nav-item" data-panel="billing">Phiếu phí</button>
        </nav>
      </aside>

      <main class="main-panel">
        <section id="home" class="panel active">
          <h2>Dashboard</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <span>Tổng villa</span>
              <strong id="totalVillaCount">0</strong>
            </div>
            <div class="stat-card">
              <span>Đã thanh toán</span>
              <strong id="paidCount">0</strong>
            </div>
            <div class="stat-card">
              <span>Chưa thanh toán</span>
              <strong id="unpaidCount">0</strong>
            </div>
            <div class="stat-card">
              <span>Doanh thu</span>
              <strong id="revenueTotal">0 đ</strong>
            </div>
          </div>
        </section>

        <section id="staff" class="panel hidden">
          <h2>Nhân viên</h2>
          <form id="staffForm" class="stack-form">
            <input id="staffName" placeholder="Tên nhân viên" required />
            <input id="staffUsername" placeholder="Tên đăng nhập" required />
            <input id="staffPassword" type="password" placeholder="Mật khẩu" required />
            <select id="staffRole">
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <button class="primary-btn" type="submit">Tạo tài khoản</button>
          </form>
          <div id="staffList" class="list-box"></div>
        </section>

        <section id="villa" class="panel hidden">
          <h2>Villa</h2>
          <div class="toolbar">
            <button id="importVillaBtn" class="primary-btn">Import villa thật</button>
          </div>
          <div id="villaList" class="list-box"></div>
        </section>

        <section id="billing" class="panel hidden">
          <h2>Phiếu phí</h2>
          <form id="billingForm" class="stack-form">
            <input id="billingVillaId" placeholder="Villa ID" required />
            <input id="billingMonth" placeholder="Tháng (VD: 09/2026)" required />
            <input id="prevElectric" type="number" placeholder="Chỉ số điện cũ" required />
            <input id="currElectric" type="number" placeholder="Chỉ số điện mới" required />
            <input id="prevWater" type="number" placeholder="Chỉ số nước cũ" required />
            <input id="currWater" type="number" placeholder="Chỉ số nước mới" required />
            <button class="primary-btn" type="submit">Lập phí & gửi thông báo</button>
          </form>
        </section>
      </main>
    </div>

    <script src="/admin.js"></script>
  </body>
</html>
