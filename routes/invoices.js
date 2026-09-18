const express = require('express');
const mongoose = require('mongoose');
const Villa = require('../models/Villa');
const UtilityRate = require('../models/UtilityRate');
const MeterReading = require('../models/MeterReading');
const Invoice = require('../models/Invoice');
const Notification = require('../models/Notification');

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
      villaId, month, previousElectric, currentElectric,
      previousWater, currentWater, notes, extraItems = []
    } = req.body;

    if (!villaId || !month) return res.status(400).json({ error: 'Thiếu villaId hoặc month' });

    const villa = await Villa.findById(villaId);
    if (!villa) return res.status(404).json({ error: 'Không tìm thấy villa' });

    const numbers = [previousElectric, currentElectric, previousWater, currentWater]
      .map((value) => Number(value || 0));
    if (numbers[1] < numbers[0] || numbers[3] < numbers[2]) {
      return res.status(400).json({ error: 'Chỉ số tháng này không được nhỏ hơn tháng trước' });
    }

    const rate = await UtilityRate.findOne({ active: true }).sort({ effectiveFrom: -1 });
    const meter = await MeterReading.findOneAndUpdate(
      { villa: villaId, month },
      {
        villa: villaId, month,
        previousElectric: numbers[0], currentElectric: numbers[1],
        previousWater: numbers[2], currentWater: numbers[3],
        notes: notes || '', createdBy: 'staff'
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const electricUsed = numbers[1] - numbers[0];
    const waterUsed = numbers[3] - numbers[2];
    const managementRate = Number(rate?.managementFeePerM2 || 18000);
    const maintenanceRate = Number(rate?.maintenanceFeePerM2 || 2000);
    const electricityRate = Number(rate?.electricityRate || 3450);
    const waterRate = Number(rate?.waterRate || 29000);
    const waterFee = waterUsed * waterRate;
    const environmentFee = waterFee * Number(rate?.environmentPercent || 0.10);
    const waterVat = waterFee * Number(rate?.waterVatPercent || 0.05);

    const items = [
      { code: 'MANAGEMENT_FEE', name: 'Phí quản lý', quantity: villa.areaM2, unit: 'm2', unitPrice: managementRate, amount: villa.areaM2 * managementRate },
      { code: 'MAINTENANCE_FEE', name: 'Phí bảo trì thu hộ/chi hộ', quantity: villa.areaM2, unit: 'm2', unitPrice: maintenanceRate, amount: villa.areaM2 * maintenanceRate },
      { code: 'ELECTRICITY', name: 'Tiền điện', quantity: electricUsed, unit: 'kwh', unitPrice: electricityRate, amount: electricUsed * electricityRate },
      { code: 'WATER', name: 'Tiền nước', quantity: waterUsed, unit: 'm3', unitPrice: waterRate, amount: waterFee },
      { code: 'ENVIRONMENT', name: 'Phí môi trường', quantity: 1, unit: 'item', unitPrice: environmentFee, amount: environmentFee },
      { code: 'WATER_VAT', name: 'Thuế GTGT nước', quantity: 1, unit: 'item', unitPrice: waterVat, amount: waterVat },
      ...extraItems
    ];
    const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    // One invoice per villa/month. Re-running after correcting meter data updates it.
    const invoice = await Invoice.findOneAndUpdate(
      { villa: villaId, period: month },
      { villa: villaId, period: month, items, total, status: 'unpaid', paymentReference: `INV-${month}-${villa.code}` },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const notification = await Notification.findOneAndUpdate(
      { villa: villaId, invoice: invoice._id },
      {
        villa: villaId,
        invoice: invoice._id,
        title: `Thông báo phí tháng ${month} - ${villa.code}`,
        message: `Hóa đơn tháng ${month} của ${villa.code} đã được lập. Tổng tiền: ${total.toLocaleString('vi-VN')} đ. Vui lòng mở ứng dụng để xem chi tiết.`,
        type: 'invoice_ready',
        read: false,
        sentAt: new Date()
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ invoice, meter, notification });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
