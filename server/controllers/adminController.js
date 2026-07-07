const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Lead = require('../models/Lead');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
};

const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments()
    ]);

    res.json({ leads, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const markRead = async (req, res) => {
  try {
    await Lead.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStats = async (req, res) => {
  try {
    const [total, unread, students, institutes] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ read: false }),
      Lead.countDocuments({ type: { $in: ['student', 'parent'] } }),
      Lead.countDocuments({ type: 'institute' })
    ]);
    res.json({ total, unread, students, institutes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, logout, getLeads, markRead, getStats };