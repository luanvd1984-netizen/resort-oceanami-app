const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json([]));
router.post('/', (req, res) => res.status(201).json(req.body));
router.patch('/:id/lock', (req, res) => res.json({ id: req.params.id, locked: true }));
module.exports = router;
