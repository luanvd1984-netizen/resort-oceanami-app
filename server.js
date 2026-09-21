const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { requireAuth } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Login/bootstrap and health remain public. All other API resources require a valid JWT.
app.use('/api/auth', require('./routes/auth'));
app.get('/api/health', (req, res) => res.json({ ok: true, message: 'Resort Oceanami API is running' }));

app.use('/api/users', requireAuth, require('./routes/users'));
app.use('/api/villas', requireAuth, require('./routes/villas'));
app.use('/api/fees', requireAuth, require('./routes/fees'));
app.use('/api/utilities', requireAuth, require('./routes/utilities'));
app.use('/api/invoices', requireAuth, require('./routes/invoices'));
app.use('/api/notifications', requireAuth, require('./routes/notifications'));
app.use('/api/payments', requireAuth, require('./routes/payments'));
app.use('/api/announcements', requireAuth, require('./routes/announcements'));
app.use('/api/messages', requireAuth, require('./routes/messages'));
app.use('/api/feedback', requireAuth, require('./routes/feedback'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const port = Number(process.env.PORT || 5000);
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resort-oceanami');
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) start();
module.exports = { app, start };
