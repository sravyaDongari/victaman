const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const db = require('../db');

// Example tracking data 
const trackingData = [
  { id: 1, trackingNumber: 'ABC123', status: 'In Transit', location: 'Warehouse A' },
  { id: 2, trackingNumber: 'XYZ456', status: 'Delivered', location: 'Customer Address' },
];

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  // Check if the user has admin privileges (you may implement this logic based on your authentication mechanism)
  const isAdminUser = false; // Replace this with your admin check logic

  if (isAdminUser) {
    next();
  } else {
    res.status(403).json({ message: 'Permission denied. Admin access required.' });
  }
};

// Route to create tracking information
router.post('/', verifyToken, isAdmin, (req, res) => {
  // Implement logic to create tracking information
  const { trackingNumber, status, location } = req.body;

  // Add the new tracking information to the data (you would typically add it to your database)
  const newTracking = { id: trackingData.length + 1, trackingNumber, status, location };
  trackingData.push(newTracking);

  res.json({ message: 'Tracking information created successfully', trackingInfo: newTracking });
});

// Route to update tracking information
router.put('/:trackingNumber', verifyToken, isAdmin, (req, res) => {
  // Implement logic to update tracking information
  const { trackingNumber } = req.params;
  const { status, location } = req.body;

  // Find the tracking information based on the tracking number
  const foundTrackingIndex = trackingData.findIndex((data) => data.trackingNumber === trackingNumber);

  if (foundTrackingIndex !== -1) {
    // Update the tracking information
    trackingData[foundTrackingIndex] = { ...trackingData[foundTrackingIndex], status, location };
    res.json({ message: 'Tracking information updated successfully', trackingInfo: trackingData[foundTrackingIndex] });
  } else {
    res.status(404).json({ message: 'Tracking information not found' });
  }
});

// Route to delete tracking information
router.delete('/:trackingNumber', verifyToken, isAdmin, (req, res) => {
  // Implement logic to delete tracking information
  const { trackingNumber } = req.params;

  // Find the index of the tracking information based on the tracking number
  const foundTrackingIndex = trackingData.findIndex((data) => data.trackingNumber === trackingNumber);

  if (foundTrackingIndex !== -1) {
    // Remove the tracking information
    const deletedTracking = trackingData.splice(foundTrackingIndex, 1);
    res.json({ message: 'Tracking information deleted successfully', deletedTracking });
  } else {
    res.status(404).json({ message: 'Tracking information not found' });
  }
});

module.exports = router;