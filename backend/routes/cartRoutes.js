const express = require('express');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /carts - add item to current user's cart
router.post('/', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).send('Item not found');

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ item: itemId, quantity: 1 }]
      });
    } else {
      const existing = cart.items.find(i => i.item.toString() === itemId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({ item: itemId, quantity: 1 });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).send('Error updating cart');
  }
});

// GET /carts - list all carts (for admin/testing)
router.get('/', async (req, res) => {
  const carts = await Cart.find().populate('user').populate('items.item');
  res.json(carts);
});

// GET /carts/me - current user's cart
router.get('/me', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
  res.json(cart || { items: [] });
});

module.exports = router;
