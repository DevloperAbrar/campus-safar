const PageView = require('../models/PageView');
const Event = require('../models/Event');

const trackPageView = async (req, res) => {
  try {
    const { path, referrer } = req.body;
    await PageView.create({
      path,
      referrer,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const trackEvent = async (req, res) => {
  try {
    const { type, meta } = req.body;
    await Event.create({ type, meta, ip: req.ip });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const [totalViews, weekViews, totalEvents, topPages] = await Promise.all([
      PageView.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      PageView.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Event.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      PageView.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    // Daily views for chart (last 7 days)
    const dailyViews = await PageView.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ totalViews, weekViews, totalEvents, topPages, dailyViews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { trackPageView, trackEvent, getAnalytics };