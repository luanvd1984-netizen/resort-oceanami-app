const express = require('express');
const mongoose = require('mongoose');
const Villa = require('../models/Villa');
const UtilityRate = require('../models/UtilityRate');
const MeterReading = require('../models/MeterReading');
const Invoice = require('../models/Invoice');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('villa').sort({ period: -1 });
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

router.post('/generate', async (req, res) => {
  try {
    const {
      villaId,
      month,
      previousElectric,
      currentElectric,
      previousWater,
      currentWater,
      notes,
      extraItems = []
    } = req.body;

    if (!villaId || !month) {
      return res.status(400).json({ error: 'Thiếu villaId hoặc month' });
    }

    const villa = await Villa.findById(villaId);
    if (!villa) return res.status(404).json({ error: 'Không tìm thấy villa' });

    const rate = await UtilityRate.findOne({ active: true }).sort({ effectiveFrom: -1 });
    const meter = await MeterReading.findOneAndUpdate(
      { villa: villaId, month },
      {
        villa: villaId,
        month,
        previousElectric: Number(previousElectric || 0),
        currentElectric: Number(currentElectric || 0),
        previousWater: Number(previousWater || 0),
        currentWater: Number(currentWater || 0),
        notes: notes || '',
        createdBy: 'admin'
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const electricUsed = Math.max(Number(currentElectric || 0) - Number(previousElectric || 0), 0);
    const waterUsed = Math.max(Number(currentWater || 0) - Number(previousWater || 0), 0);

    const managementFee = Number(villa.areaM2 || 0) * Number(rate?.managementFeePerM2 || 18000);
    const maintenanceFee = Number(villa.areaM2 || 0) * Number(rate?.maintenanceFeePerM2 || 2000);
    const electricityFee = electricUsed * Number(rate?.electricityRate || 3450);
    const waterFee = waterUsed * Number(rate?.waterRate || 29000);
    const environmentFee = waterFee * Number(rate?.environmentPercent || 0.10);
    const waterVat = waterFee * Number(rate?.waterVatPercent || 0.05);

    const items = [
      { code: 'MANAGEMENT_FEE', name: 'Phí quản lý', quantity: villa.areaM2 || 0, unit: 'm2', unitPrice: rate?.managementFeePerM2 || 18000, amount: managementFee },
      { code: 'MAINTENANCE_FEE', name: 'Phí bảo trì', quantity: villa.areaM2 || 0, unit: 'm2', unitPrice: rate?.maintenanceFeePerM2 || 2000, amount: maintenanceFee },
      { code: 'ELECTRICITY', name: 'Tiền điện', quantity: electricUsed, unit: 'kwh', unitPrice: rate?.electricityRate || 3450, amount: electricityFee },
      { code: 'WATER', name: 'Tiền nước', quantity: waterUsed, unit: 'm3', unitPrice: rate?.waterRate || 29000, amount: waterFee },
      { code: 'ENVIRONMENT', name: 'Phí môi trường', quantity: 1, unit: 'item', unitPrice: environmentFee, amount: environmentFee },
      { code: 'WATER_VAT', name: 'Thuế GTGT nước', quantity: 1, unit: 'item', unitPrice: waterVat, amount: waterVat },
      ...extraItems
    ];

    const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const invoice = await Invoice.create({
      villa: villaId,
      period: month,
      items,
      total,
      status: 'unpaid',
      paymentReference: `INV-${month}-${villa.code}`
    });

    res.status(201).json({ invoice, meter });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
