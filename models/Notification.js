const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa', required: true },
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['invoice_ready', 'payment', 'general'], default: 'invoice_ready' },
  read: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

NotificationSchema.index({ villa: 1, createdAt: -1 });
module.exports = mongoose.model('Notification', NotificationSchema);
