const express = require('express');
const router = express.Router();
const { getTeam } = require('../controllers/teamController');

// GET /api/team  — public, used by About.jsx
router.get('/', getTeam);

module.exports = router;