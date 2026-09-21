const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const router = express.Router();

function ownVilla(req, villaId) {
  return ['admin', 'staff'].includes(req.user.role) || String(req.user.villa?._id || req.user.villa) === String(villaId);
}

router.get('/', async (req, res) => {
  try {
    const requestedVilla = req.query.villaId;
    if (requestedVilla && !mongoose.isValidObjectId(requestedVilla)) return res.status(400).json({ error: 'villaId không hợp lệ' });
    if (req.user.role === 'resident' && requestedVilla && !ownVilla(req, requestedVilla)) return res.status(403).json({ error: 'Không có quyền xem thông báo của villa khác' });

    const filter = req.user.role === 'resident'
      ? { villa: req.user.villa?._id }
      : (requestedVilla ? { villa: requestedVilla } : {});
    res.json(await Notification.find(filter).populate('invoice').sort({ createdAt: -1 }));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Không tìm thấy thông báo' });
    if (!ownVilla(req, notification.villa)) return res.status(403).json({ error: 'Không có quyền cập nhật thông báo này' });
    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
