const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// POST /items - create item
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Error creating item');
  }
});

// GET /items - list items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;
