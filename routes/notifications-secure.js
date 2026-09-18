const express = require('express');
const Notification = require('../models/Notification');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const filter = req.user.role === 'resident' ? { villa: req.user.villa?._id } : (req.query.villaId ? { villa: req.query.villaId } : {});
    res.json(await Notification.find(filter).populate('invoice').sort({ createdAt: -1 }));
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Không tìm thấy thông báo' });
    if (req.user.role === 'resident' && String(notification.villa) !== String(req.user.villa?._id)) return res.status(403).json({ error: 'Không được cập nhật thông báo villa khác' });
    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (err) { res.status(400).json({ error: err.message }); }
});
module.exports = router;
