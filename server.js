const express = require('express');
const User = require('../models/User');
const Villa = require('../models/Villa');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').populate('villa').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash').populate('villa');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, username, password, role, villaId } = req.body;
    if (!name || !username || !password) return res.status(400).json({ error: 'Thiếu thông tin người dùng' });

    const payload = {
      name,
      username: String(username).trim().toUpperCase(),
      passwordHash: await bcrypt.hash(String(password), 10),
      role: role || 'resident',
      active: true
    };

    if (villaId) payload.villa = villaId;
    const user = await User.create(payload);
    res.status(201).json({ id: user._id, username: user.username, role: user.role, name: user.name });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.password) {
      payload.passwordHash = await bcrypt.hash(String(payload.password), 10);
      delete payload.password;
    }
    const user = await User.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
