const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// In-app notifications for a villa/resident.
router.get('/', async (req, res) => {
  try {
    const filter = req.query.villaId ? { villa: req.query.villaId } : {};
    res.json(await Notification.find(filter).populate('invoice').sort({ createdAt: -1 }));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ error: 'Không tìm thấy thông báo' });
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
