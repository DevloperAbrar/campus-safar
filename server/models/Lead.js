const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  type: { type: String, enum: ['student', 'parent', 'institute', 'other'], default: 'student' },
  message: { type: String, trim: true },
  source: { type: String, default: 'contact_form' }, // contact_form, demo_request, hero_cta
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);