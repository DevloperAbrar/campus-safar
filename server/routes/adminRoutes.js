const express = require('express');
const router = express.Router();
const { login, logout, getLeads, markRead, getStats } = require('../controllers/adminController');
const { getAllTeam, createMember, updateMember, deleteMember } = require('../controllers/teamController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');

// ── Auth ─────────────────────────────────────────────────────────────────────
router.post('/login', login);
router.post('/logout', protect, logout);

// ── Leads ────────────────────────────────────────────────────────────────────
router.get('/leads', protect, getLeads);
router.get('/leads/stats', protect, getStats);
router.patch('/leads/:id/read', protect, markRead);

// ── Team (CRUD) ───────────────────────────────────────────────────────────────
router.get('/team', protect, getAllTeam);
router.post('/team', protect, createMember);
router.put('/team/:id', protect, updateMember);
router.delete('/team/:id', protect, deleteMember);

// Image upload
router.post('/team/upload-image', protect, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`
    res.json({ imageUrl })
  })

module.exports = router;