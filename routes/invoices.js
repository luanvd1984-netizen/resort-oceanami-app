const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();
router.get('/', async (req, res) => { try { res.json(await Invoice.find().populate('villa').sort({ period: -1 })); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/:id', async (req, res) => { try { const item = await Invoice.findById(req.params.id).populate('villa'); if (!item) return res.status(404).json({ error: 'Không tìm thấy hóa đơn' }); res.json(item); } catch (e) { res.status(400).json({ error: e.message }); } });
router.post('/', async (req, res) => { try { res.status(201).json(await Invoice.create(req.body)); } catch (e) { res.status(400).json({ error: e.message }); } });
router.patch('/:id/pay', async (req, res) => { try { res.json(await Invoice.findByIdAndUpdate(req.params.id, { status: 'paid', paidAt: new Date(), paymentReference: req.body.reference }, { new: true })); } catch (e) { res.status(400).json({ error: e.message }); } });
module.exports = router;
