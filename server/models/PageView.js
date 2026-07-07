const mongoose = require('mongoose');

const PageViewSchema = new mongoose.Schema({
  path: { type: String, required: true },
  ip: String,
  userAgent: String,
  referrer: String
}, { timestamps: true });

module.exports = mongoose.model('PageView', PageViewSchema);