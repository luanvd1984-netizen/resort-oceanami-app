const express = require('express');
const FeeConfig = require('../models/FeeConfig');
const router = express.Router();
router.get('/', async (req, res) => { try { res.json(await FeeConfig.find({ active: true }).sort({ name: 1 })); } catch (e) { res.status(500).json({ error: e.message }); } });
router.post('/', async (req, res) => { try { res.status(201).json(await FeeConfig.create(req.body)); } catch (e) { res.status(400).json({ error: e.message }); } });
module.exports = router;
