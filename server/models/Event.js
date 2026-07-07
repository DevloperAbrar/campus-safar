const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: { type: String, required: true }, // cta_click, demo_request, form_submit
  meta: { type: Object, default: {} },
  ip: String
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);