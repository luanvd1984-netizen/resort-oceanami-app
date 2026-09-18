const mongoose = require('mongoose');

const FeeConfigSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  unit: { type: String, enum: ['m2', 'kwh', 'm3', 'fixed'], required: true },
  price: { type: Number, required: true, min: 0 },
  effectiveFrom: { type: Date, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FeeConfig', FeeConfigSchema);
