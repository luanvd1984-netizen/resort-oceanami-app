const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa', required: true },
  period: { type: String, required: true },
  items: [{
    code: String,
    name: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    amount: Number
  }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['unpaid', 'paid', 'cancelled'], default: 'unpaid' },
  paymentReference: String,
  paidAt: Date
}, { timestamps: true });

InvoiceSchema.index({ villa: 1, period: 1 }, { unique: true });
module.exports = mongoose.model('Invoice', InvoiceSchema);
