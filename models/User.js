const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: String,
  passwordHash: String,
  role: { type: String, enum: ['admin', 'staff', 'resident'], default: 'resident' },
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
