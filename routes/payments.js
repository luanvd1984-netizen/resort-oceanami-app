const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Chức năng thanh toán QR đang chờ cấu hình ngân hàng' }));
module.exports = router;
