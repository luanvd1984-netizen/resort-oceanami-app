const express = require('express');
const fs = require('fs');
const path = require('path');
const Villa = require('../models/Villa');

const router = express.Router();
const readCsv = () => {
  const file = path.join(__dirname, '..', 'data', 'villas-real.csv');
  const lines = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  lines.shift();
  return lines.map((line, index) => {
    const [code, ownerName, areaM2, active] = line.split(',');
    if (!code || !ownerName || !Number.isFinite(Number(areaM2))) throw new Error(`Dòng CSV không hợp lệ: ${index + 2}`);
    return { code: code.trim().toUpperCase(), ownerName: ownerName.trim(), areaM2: Number(areaM2), active: active !== 'false' };
  });
};

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.active !== undefined) filter.active = req.query.active !== 'false';
    if (req.query.search) filter.$or = [{ code: { $regex: req.query.search, $options: 'i' } }, { ownerName: { $regex: req.query.search, $options: 'i' } }];
    res.json(await Villa.find(filter).sort({ code: 1 }));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/import-real', async (req, res) => {
  try {
    const rows = readCsv();
    const result = await Villa.bulkWrite(rows.map((row) => ({ updateOne: { filter: { code: row.code }, update: { $set: row }, upsert: true } })), { ordered: false });
    res.json({ message: 'Đã import dữ liệu villa thật', total: rows.length, inserted: result.upsertedCount, updated: result.modifiedCount });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try { const villa = await Villa.findById(req.params.id); if (!villa) return res.status(404).json({ error: 'Không tìm thấy villa' }); res.json(villa); }
  catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
