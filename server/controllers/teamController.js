const TeamMember = require('../models/TeamMember');

// ── PUBLIC ──────────────────────────────────────────────────────────────────

// GET /api/team  — returns all active members, sorted by order
const getTeam = async (req, res) => {
  try {
    const members = await TeamMember.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json({ members });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ── ADMIN ────────────────────────────────────────────────────────────────────

// GET /api/admin/team  — returns ALL members (including inactive), for dashboard
const getAllTeam = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json({ members });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/admin/team  — create a new member
const createMember = async (req, res) => {
  try {
    const { name, role, dept, bio, linkedin, imageUrl, order, active } = req.body;
    if (!name || !role || !dept) {
      return res.status(400).json({ message: 'name, role and dept are required' });
    }
    const member = await TeamMember.create({ name, role, dept, bio, linkedin, imageUrl, order, active });
    res.status(201).json({ member });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/admin/team/:id  — update a member
const updateMember = async (req, res) => {
  try {
    const { name, role, dept, bio, linkedin, imageUrl, order, active } = req.body;
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { name, role, dept, bio, linkedin, imageUrl, order, active },
      { new: true, runValidators: true }
    );
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ member });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/admin/team/:id  — delete a member
const deleteMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTeam, getAllTeam, createMember, updateMember, deleteMember };