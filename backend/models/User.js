const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  token: { type: String, default: null },     // active session token
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
