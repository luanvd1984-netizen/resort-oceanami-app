const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resort-oceanami', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/villas', require('./routes/villas'));
app.use('/api/fees', require('./routes/fees'));
app.use('/api/utilities', require('./routes/utilities'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/feedback', require('./routes/feedback'));

app.get('/', (req, res) => {
  res.json({
    message: '✅ Resort Oceanami API is running',
    version: '1.0.0',
    billing: {
      managementFeePerM2: 18000,
      maintenanceFeePerM2: 2000,
      electricityRatePerKwh: 3450,
      waterRatePerM3: 29000,
      waterEnvironmentPercent: 10,
      waterVatPercent: 5
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
