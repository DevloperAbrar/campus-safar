const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { message: 'Too many submissions. Please try again later.' }
});

module.exports = { contactLimiter };