const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Villa = require('../models/Villa');
const router = express.Router();

const secret = process.env.JWT_SECRET || 'change-this-secret-in-production';

function tokenFor(user) {
  return jwt.sign({ id: user._id, role: user.role, villa: user.villa }, secret, { expiresIn: '30d' });
}

router.post('/login', async (req, res) => {
  try {
    const username = String(req.body.username || req.body.villaCode || '').trim().toUpperCase();
    const password = String(req.body.password || '');

    if (!username || !password) {
      return res.status(400).json({ error: 'Thiếu mã villa hoặc mật khẩu' });
    }

    const user = await User.findOne({ username, active: true }).populate('villa');
    if (!user) {
      return res.status(401).json({ error: 'Mã villa/tài khoản không tồn tại' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Mật khẩu không đúng' });
    }

    res.json({
      token: tokenFor(user),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        username: user.username,
        villa: user.villa
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/bootstrap', async (req, res) => {
  try {
    const { key, password } = req.body;
    if (!process.env.BOOTSTRAP_KEY || key !== process.env.BOOTSTRAP_KEY) {
      return res.status(403).json({ error: 'Không được phép khởi tạo tài khoản' });
    }

    if (!password || String(password).length < 4) {
      return res.status(400).json({ error: 'Mật khẩu không hợp lệ' });
    }

    const villas = await Villa.find({ active: true });
    const passwordHash = await bcrypt.hash(String(password), 10);
    let created = 0;

    for (const villa of villas) {
      const result = await User.updateOne(
        { username: villa.code },
        { $setOnInsert: { name: villa.ownerName, username: villa.code, passwordHash, role: 'resident', villa: villa._id, active: true } },
        { upsert: true }
      );
      if (result.upsertedCount) created += 1;
    }

    res.json({ message: 'Đã tạo tài khoản cư dân theo mã villa', totalVillas: villas.length, created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
