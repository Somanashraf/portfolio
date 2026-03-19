const router = require('express').Router();
const Analytics = require('../models/Analytics');
const auth = require('../middleware/auth');

// Track a page visit (public)
router.post('/track', async (req, res) => {
  try {
    const { page } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers['referer'] || '';
    await Analytics.create({ page, ip, userAgent, referrer });
    res.json({ tracked: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get analytics summary (admin only)
router.get('/summary', auth, async (req, res) => {
  try {
    const total = await Analytics.countDocuments();
    const pageViews = await Analytics.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const recent = await Analytics.find().sort({ timestamp: -1 }).limit(20);
    const uniqueIPs = await Analytics.distinct('ip');

    // Daily visits for last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dailyVisits = await Analytics.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ total, uniqueVisitors: uniqueIPs.length, pageViews, recent, dailyVisits });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
