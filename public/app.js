:root {
  --bg: #f5f7fb;
  --panel: #ffffff;
  --primary: #0f766e;
  --primary-dark: #115e59;
  --accent: #f59e0b;
  --danger: #ef4444;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;
  --shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

* { box-sizing: border-box; }
html, body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}
body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.app-shell {
  width: min(100%, 480px);
  min-height: 100vh;
  background: #f7faf9;
  position: relative;
  box-shadow: var(--shadow);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 12px;
  background: var(--panel);
  border-bottom: 1px solid var(--line);
}

.eyebrow {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
}

h1, h2, h3, p { margin: 0; }

.screen {
  padding: 16px 18px 90px;
}

.panel { display: none; }
.panel.active { display: block; }
.hidden { display: none !important; }

.brand-box {
  text-align: center;
  margin: 20px 0 26px;
}

.brand-mark {
  width: 68px;
  height: 68px;
  border-radius: 18px;
  margin: 0 auto 12px;
  display: grid;
  place-items: center;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), #14b8a6);
  color: white;
  box-shadow: var(--shadow);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

input {
  border: 1px solid var(--line);
  background: white;
  border-radius: 12px;
  padding: 14px 12px;
  font-size: 16px;
}

.primary-btn, .action-btn, .method-btn, .nav-item, .icon-btn {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
}

.primary-btn {
  background: var(--primary);
  color: white;
  padding: 14px 16px;
  width: 100%;
  margin-top: 6px;
}

.primary-btn.small {
  width: auto;
  padding: 12px 16px;
}

.small-note {
  margin-top: 18px;
  text-align: center;
  color: var(--muted);
  font-size: 12px;
}

.bill-card {
  background: var(--panel);
  border-radius: 20px;
  padding: 18px;
  box-shadow: var(--shadow);
}

.bill-card.accent {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.bill-topline {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 8px;
}

.bill-total {
  font-size: clamp(30px, 6vw, 42px);
  font-weight: 700;
  margin-bottom: 8px;
}

.bill-status {
  font-size: 14px;
  opacity: 0.9;
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 18px 0;
}

.action-btn {
  padding: 14px 12px;
  background: white;
  border: 1px solid var(--line);
  color: var(--text);
}

.action-btn.accent {
  background: var(--accent);
  color: #1f2937;
}

.info-box, .user-card, .list-card, .payment-box, .invoice-item, .community-item {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--shadow);
}

.info-box h3 { margin-bottom: 10px; }
#notificationList, #communityList { list-style: none; padding: 0; margin: 0; }
#notificationList li, .community-item { margin-bottom: 10px; }

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 14px;
}

.badge {
  background: #ecfdf5;
  color: var(--primary);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
}

.invoice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.invoice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.invoice-item strong { font-size: 15px; }
.invoice-item .meta { color: var(--muted); font-size: 12px; }
.invoice-amount { font-weight: 700; }

.chat-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
  max-height: 56vh;
  overflow: auto;
}

.message {
  max-width: 78%;
  padding: 10px 12px;
  border-radius: 14px;
  line-height: 1.4;
}

.message.admin {
  background: #e6f7f5;
  color: var(--text);
  align-self: flex-start;
}

.message.user {
  background: var(--primary);
  color: white;
  align-self: flex-end;
}

.chat-input-wrap {
  display: flex;
  gap: 8px;
}
.chat-input-wrap input {
  flex: 1;
}

.user-card {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--primary);
  color: white;
  font-weight: 700;
}

.list-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.payment-box {
  margin-bottom: 16px;
  display: grid;
  gap: 8px;
}

.payment-amount {
  font-size: 30px;
  font-weight: 700;
  color: var(--primary);
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.method-btn {
  padding: 12px 8px;
  background: white;
  border: 1px solid var(--line);
  color: var(--text);
}

.method-btn.active {
  background: var(--primary);
  color: white;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 480px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: white;
  border-top: 1px solid var(--line);
  box-shadow: 0 -8px 30px rgba(15, 23, 42, 0.06);
}

.nav-item {
  background: transparent;
  color: var(--muted);
  padding: 12px 8px 14px;
  font-size: 12px;
}

.nav-item.active {
  color: var(--primary);
  font-weight: 700;
}

.icon-btn {
  background: transparent;
  color: var(--text);
  padding: 8px 10px;
}

@media (min-width: 720px) {
  body {
    padding: 26px 0;
  }
  .app-shell {
    border-radius: 24px;
    overflow: hidden;
  }
}
