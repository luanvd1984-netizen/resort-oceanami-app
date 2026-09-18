const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'change-this-secret-in-production';

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Vui lòng đăng nhập' });
    const payload = jwt.verify(token, secret);
    const user = await User.findOne({ _id: payload.id, active: true }).populate('villa');
    if (!user) return res.status(401).json({ error: 'Tài khoản không còn hoạt động' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn' });
  }
}

function requireStaff(req, res, next) {
  if (!req.user || !['admin', 'staff'].includes(req.user.role)) return res.status(403).json({ error: 'Chỉ nhân viên mới được thực hiện thao tác này' });
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'Chỉ quản trị viên mới được thực hiện thao tác này' });
  next();
}

module.exports = { requireAuth, requireStaff, requireAdmin };
