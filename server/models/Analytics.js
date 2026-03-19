const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  page: { type: String, required: true },
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  referrer: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
