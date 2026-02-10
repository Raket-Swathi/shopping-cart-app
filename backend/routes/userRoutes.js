const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/users - signup
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Missing fields');
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).send('Username already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });

    return res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).send('Server error');
  }
});

// GET /api/users - list users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password -token');
  res.json(users);
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid username/password');
    }

    if (user.token) {
      return res.status(403).send('User is already logged in on another device.');
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).send('Invalid username/password');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    return res.header('Authorization', token).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).send('Server error');
  }
});

// POST /api/users/logout  <-- ADD IT HERE
// POST /api/users/logout
router.post('/logout', auth, async (req, res) => {
  try {
    console.log('LOGOUT: user before', { id: req.user._id, token: req.user.token });

    req.user.token = null;
    await req.user.save();

    const freshUser = await User.findById(req.user._id);
    console.log('LOGOUT: user after', { id: freshUser._id, token: freshUser.token });

    res.send('Logged out successfully');
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).send('Error during logout');
  }
});


module.exports = router;
