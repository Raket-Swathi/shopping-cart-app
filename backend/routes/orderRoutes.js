const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /orders - convert current cart to order
router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).send('Cart is empty');
    }

    const order = await Order.create({
      user: req.user._id,
      cart: cart._id,
      items: cart.items
    });

    // clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).send('Error creating order');
  }
});

// GET /orders - list all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.item');
  res.json(orders);
});

// GET /orders/me - current user's orders
router.get('/me', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
