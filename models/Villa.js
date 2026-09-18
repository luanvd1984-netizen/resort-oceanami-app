const mongoose = require('mongoose');

const VillaSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  ownerPhone: String,
  ownerEmail: String,
  areaM2: { type: Number, required: true, min: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Villa', VillaSchema);
