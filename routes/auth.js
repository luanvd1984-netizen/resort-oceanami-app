const express = require('express');
const router = express.Router();
router.post('/login', (req, res) => res.status(501).json({ error: 'Đăng nhập sẽ được tích hợp ở bước bảo mật tiếp theo' }));
module.exports = router;
