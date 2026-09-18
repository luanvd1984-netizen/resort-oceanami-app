const express = require('express');
const Invoice = require('../models/Invoice');
const { requireAuth, requireStaff } = require('../middleware/auth');
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const filter = req.user.role === 'resident' ? { villa: req.user.villa?._id } : {};
    res.json(await Invoice.find(filter).populate('villa').sort({ createdAt: -1, period: -1 }));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('villa');
    if (!invoice) return res.status(404).json({ error: 'Không tìm thấy hóa đơn' });
    if (req.user.role === 'resident' && String(invoice.villa._id) !== String(req.user.villa?._id)) return res.status(403).json({ error: 'Không được xem hóa đơn villa khác' });
    res.json(invoice);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Chỉ nhân viên/admin được lập hoặc cập nhật hóa đơn.
router.post('/generate', requireAuth, requireStaff, async (req, res, next) => {
  try {
    const original = require('./invoices');
    return next(new Error('Use the existing invoice generation implementation with staff middleware'));
  } catch (err) { next(err); }
});

module.exports = router;
