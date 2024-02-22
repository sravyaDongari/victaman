// /courier-tracking-system/server/models/TrackingModel.js
const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  // Add other fields as needed
});

module.exports = mongoose.model('Tracking', trackingSchema);
