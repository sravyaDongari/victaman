// /courier-tracking-system/client/src/pages/AdminPage.js
import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';

const AdminPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [adminActionMessage, setAdminActionMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddTracking = async () => {
    try {
      // Custom logic to handle adding tracking information
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingNumber,
          status,
          location,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAdminActionMessage('Tracking information added successfully');
        setError('');
      } else {
        setAdminActionMessage('');
        setError(data.message || 'Error adding tracking information');
      }
    } catch (error) {
      console.error('Error adding tracking information:', error);
      setAdminActionMessage('');
      setError('Error adding tracking information');
    }
  };

  // Additional functions for updating and deleting tracking information

  return (
    <div>
      <h2>Admin Panel</h2>
      <AdminPanel
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        status={status}
        setStatus={setStatus}
        location={location}
        setLocation={setLocation}
        onAddTracking={handleAddTracking}
      />
      {adminActionMessage && <p style={{ color: 'green' }}>{adminActionMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AdminPage;
