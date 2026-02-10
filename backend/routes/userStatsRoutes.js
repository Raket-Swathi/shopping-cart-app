const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/user-stats  → stats for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const [cart, orderCount] = await Promise.all([
      Cart.findOne({ user: userId }),
      Order.countDocuments({ user: userId })
    ]);

    res.json({
      userId,
      cartId: cart ? cart._id : null,
      cartItemsCount: cart ? cart.items.length : 0,
      ordersCount: orderCount
    });
  } catch (err) {
    console.error('User stats error:', err);
    res.status(500).send('Error fetching user stats');
  }
});

module.exports = router;

