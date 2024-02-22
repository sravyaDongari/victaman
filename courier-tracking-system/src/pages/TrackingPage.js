// /courier-tracking-system/client/src/pages/TrackingPage.js
import React, { useState } from 'react';
import TrackingForm from '../components/TrackingForm';
import TrackingInfo from '../components/TrackingInfo';

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch tracking information from the server
      const response = await fetch(`/api/tracking/${trackingNumber}`);
      const data = await response.json();

      if (response.ok) {
        setTrackingInfo(data);
        setError('');
      } else {
        setTrackingInfo(null);
        setError(data.message || 'Error retrieving tracking information');
      }
    } catch (error) {
      console.error('Error fetching tracking information:', error);
      setTrackingInfo(null);
      setError('Error fetching tracking information');
    }
  };

  return (
    <div>
      <TrackingForm
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        onSubmit={handleFormSubmit}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {trackingInfo && <TrackingInfo trackingInfo={trackingInfo} />}
    </div>
  );
}

export default TrackingPage;

/*
The handleFormSubmit function is an asynchronous function that uses the fetch API to make a GET request to the server endpoint /api/tracking/${trackingNumber} to retrieve tracking information based on the entered tracking number.

If the request is successful (response.ok), the tracking information is set using setTrackingInfo, and the setError is cleared.

If there's an error, it sets an error message using setError.

The TrackingForm component is assumed to take the trackingNumber, setTrackingNumber, and onSubmit as props to handle user input and form submission. */