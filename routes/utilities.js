const express = require('express');
const UtilityRate = require('../models/UtilityRate');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rate = await UtilityRate.findOne({ active: true }).sort({ effectiveFrom: -1 });
    res.json(rate || {
      managementFeePerM2: 18000,
      maintenanceFeePerM2: 2000,
      electricityRate: 3450,
      waterRate: 29000,
      environmentPercent: 0.10,
      waterVatPercent: 0.05
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = {
      ...req.body,
      active: true,
      effectiveFrom: req.body.effectiveFrom || new Date()
    };

    const rate = await UtilityRate.findOneAndUpdate(
      { active: true },
      { $set: { active: false } },
      { new: true }
    );

    const created = await UtilityRate.create(payload);
    res.status(201).json({ created, previous: rate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
