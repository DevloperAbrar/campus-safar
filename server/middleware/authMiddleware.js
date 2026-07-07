const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = { protect };