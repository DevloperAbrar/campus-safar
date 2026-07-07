const express = require('express');
const router = express.Router();
const { trackPageView, trackEvent, getAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/pageview', trackPageView);
router.post('/event', trackEvent);
router.get('/dashboard', protect, getAnalytics);

module.exports = router;