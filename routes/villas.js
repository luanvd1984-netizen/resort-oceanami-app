const express = require('express');
const Villa = require('../models/Villa');
const router = express.Router();
router.get('/', async (req, res) => { try { res.json(await Villa.find().sort({ code: 1 })); } catch (e) { res.status(500).json({ error: e.message }); } });
router.post('/', async (req, res) => { try { res.status(201).json(await Villa.create(req.body)); } catch (e) { res.status(400).json({ error: e.message }); } });
router.put('/:id', async (req, res) => { try { res.json(await Villa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })); } catch (e) { res.status(400).json({ error: e.message }); } });
module.exports = router;
