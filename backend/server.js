const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userStatsRoutes = require('./routes/userStatsRoutes');

const app = express();

// CORS: allow frontend URL from env (Netlify in prod, Vite in dev)
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user-stats', userStatsRoutes);

// Healthcheck route (optional)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
