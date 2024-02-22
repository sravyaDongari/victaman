import React, { useState } from 'react';

const TrackingForm = ({ onTrack }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();

    // Validate if trackingNumber is not empty before making the request
    if (!trackingNumber.trim()) {
      alert('Please enter a tracking number.');
      return;
    }

    try {
      // Make a request to the backend API endpoint for tracking
      const response = await fetch(`/api/track/${trackingNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include the token if needed for authentication
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
      });

      if (response.ok) {
        // Parse the response JSON and pass it to the parent component
        const trackingInfo = await response.json();
        onTrack(trackingInfo);
      } else {
        // Handle errors, you might want to show an error message to the user
        console.error('Error fetching tracking information:', response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleTrack}>
        <label>
          Enter Tracking Number:
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </label>
        <button type="submit">Track</button>
      </form>
    </div>
  );
};

export default TrackingForm;
