const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Villa = require('../models/Villa');

const router = express.Router();
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET is required');

const makeToken = (user) => jwt.sign(
  { id: user._id, role: user.role, villa: user.villa || null },
  secret,
  { expiresIn: '30d' }
);

router.post('/login', async (req, res) => {
  try {
    const username = String(req.body.username || req.body.villaCode || '').trim().toUpperCase();
    const password = String(req.body.password || '');
    if (!username || !password) return res.status(400).json({ error: 'Thiếu tài khoản hoặc mật khẩu' });

    const user = await User.findOne({ username, active: true }).populate('villa');
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không đúng' });
    }

    res.json({
      token: makeToken(user),
      user: { id: user._id, name: user.name, username: user.username, role: user.role, villa: user.villa }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/bootstrap-residents', async (req, res) => {
  try {
    if (!process.env.BOOTSTRAP_KEY || req.body.key !== process.env.BOOTSTRAP_KEY) return res.status(403).json({ error: 'Không được phép' });
    const password = String(req.body.password || '');
    if (password.length < 4) return res.status(400).json({ error: 'Mật khẩu tối thiểu 4 ký tự' });

    const hash = await bcrypt.hash(password, 10);
    const villas = await Villa.find({ active: true });
    let created = 0;
    for (const villa of villas) {
      const result = await User.updateOne(
        { username: villa.code },
        { $setOnInsert: { name: villa.ownerName, username: villa.code, passwordHash: hash, role: 'resident', villa: villa._id, active: true } },
        { upsert: true }
      );
      created += result.upsertedCount || 0;
    }
    res.json({ message: 'Đã tạo tài khoản cư dân', total: villas.length, created });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
