const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

connectDB();

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// ── Serve uploaded images (CORS-open) ────────────────────────────────────────
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
}, express.static(path.join(__dirname, 'uploads')))

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));