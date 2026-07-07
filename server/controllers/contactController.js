const Lead = require('../models/Lead');
const Event = require('../models/Event');

const submitContact = async (req, res) => {
  try {
    const { fullName, email, phone, type, message, source } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const lead = await Lead.create({ fullName, email, phone, type, message, source: source || 'contact_form' });

    await Event.create({
      type: 'form_submit',
      meta: { formType: source || 'contact_form', leadType: type },
      ip: req.ip
    });

    res.status(201).json({ success: true, message: 'Message received! We\'ll get back to you within 24 hours.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact };