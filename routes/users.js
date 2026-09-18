const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Villa = require('../models/Villa');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').populate('villa').sort({ role: 1, username: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/staff', async (req, res) => {
  try {
    const { name, username, password, role = 'staff' } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ error: 'Thiếu thông tin tài khoản' });
    }
    if (!['staff', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Vai trò không hợp lệ' });
    }

    const user = await User.create({
      name,
      username: String(username).trim().toUpperCase(),
      passwordHash: await bcrypt.hash(String(password), 10),
      role,
      active: true
    });

    res.status(201).json({ id: user._id, name: user.name, username: user.username, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/reset-resident-password', async (req, res) => {
  try {
    const villaCode = String(req.body.villaCode || '').trim().toUpperCase();
    const password = String(req.body.password || '');

    if (!villaCode || !password || password.length < 4) {
      return res.status(400).json({ error: 'Thiếu mã villa hoặc mật khẩu không hợp lệ' });
    }

    const villa = await Villa.findOne({ code: villaCode });
    if (!villa) return res.status(404).json({ error: 'Không tìm thấy villa' });

    const user = await User.findOne({ villa: villa._id, role: 'resident' });
    if (!user) return res.status(404).json({ error: 'Villa chưa có tài khoản cư dân' });

    user.passwordHash = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Đã đổi mật khẩu cư dân', username: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
