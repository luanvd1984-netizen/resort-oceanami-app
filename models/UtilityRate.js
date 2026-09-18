const mongoose = require('mongoose');

const UtilityRateSchema = new mongoose.Schema({
  managementFeePerM2: { type: Number, default: 18000 },
  maintenanceFeePerM2: { type: Number, default: 2000 },
  electricityRate: { type: Number, default: 3450 },
  waterRate: { type: Number, default: 29000 },
  environmentPercent: { type: Number, default: 0.10 },
  waterVatPercent: { type: Number, default: 0.05 },
  active: { type: Boolean, default: true },
  effectiveFrom: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('UtilityRate', UtilityRateSchema);
