import React from 'react';
const TrackingInfo = ({ trackingInfo }) => {
  return (
    <div>
      <h3>Tracking Information:</h3>
      <p>Tracking Number: {trackingInfo.trackingNumber}</p>
      <p>Status: {trackingInfo.status}</p>
      <p>Location: {trackingInfo.location}</p>
    </div>
  );
};
export default TrackingInfo;