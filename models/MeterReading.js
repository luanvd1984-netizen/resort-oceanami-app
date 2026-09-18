const mongoose = require('mongoose');

const MeterReadingSchema = new mongoose.Schema({
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa', required: true },
  month: { type: String, required: true },
  previousElectric: { type: Number, min: 0, default: 0 },
  currentElectric: { type: Number, min: 0, default: 0 },
  previousWater: { type: Number, min: 0, default: 0 },
  currentWater: { type: Number, min: 0, default: 0 },
  notes: { type: String, default: '' },
  createdBy: { type: String, default: 'system' }
}, { timestamps: true });

MeterReadingSchema.index({ villa: 1, month: 1 }, { unique: true });
module.exports = mongoose.model('MeterReading', MeterReadingSchema);
