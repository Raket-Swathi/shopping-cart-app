const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).send('No token provided');

    const token = header.split(' ')[1];
    if (!token) return res.status(401).send('Invalid token format');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // enforce single-device: token must match the one stored in DB
    const user = await User.findOne({ _id: decoded._id, token: token });
    if (!user) return res.status(401).send('Invalid or expired token');

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
};
