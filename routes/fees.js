const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('villa').sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Invoice.findById(req.params.id).populate('villa');
    if (!item) return res.status(404).json({ error: 'Không tìm thấy hóa đơn' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/pay', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        status: 'paid',
        paidAt: new Date(),
        paymentReference: req.body.reference || 'manual-payment'
      },
      { new: true }
    );

    if (!invoice) return res.status(404).json({ error: 'Không tìm thấy hóa đơn' });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
