const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  role:     { type: String, required: true, trim: true },
  dept:     { type: String, required: true, trim: true },
  bio:      { type: String, trim: true, default: '' },
  linkedin: { type: String, trim: true, default: '#' },
  imageUrl: { type: String, trim: true, default: '' },
  order:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);