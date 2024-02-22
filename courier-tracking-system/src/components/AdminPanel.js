import React, { useState } from 'react';

const AdminPanel = ({ onAdminAction }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  const handleAddTracking = async (e) => {
    e.preventDefault();

    // Validate if required fields are not empty before making the request
    if (!trackingNumber.trim() || !status.trim() || !location.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Make a request to the backend API endpoint for adding tracking information
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the token if needed for authentication
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify({
          trackingNumber,
          status,
          location,
        }),
      });

      if (response.ok) {
        // Parse the response JSON and pass it to the parent component
        const addedTrackingInfo = await response.json();
        onAdminAction('add', addedTrackingInfo);
      } else {
        // Handle errors, you might want to show an error message to the user
        console.error('Error adding tracking information:', response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  const handleUpdateTracking = async (e) => {
    e.preventDefault();

    // Validate if required fields are not empty before making the request
    if (!trackingNumber.trim() || !status.trim() || !location.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Make a request to the backend API endpoint for updating tracking information
      const response = await fetch(`/api/admin/${trackingNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include the token if needed for authentication
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify({
          status,
          location,
        }),
      });

      if (response.ok) {
        // Parse the response JSON and pass it to the parent component
        const updatedTrackingInfo = await response.json();
        onAdminAction('update', updatedTrackingInfo);
      } else {
        // Handle errors, you might want to show an error message to the user
        console.error('Error updating tracking information:', response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  const handleDeleteTracking = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the backend API endpoint for deleting tracking information
      const response = await fetch(`/api/admin/${trackingNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include the token if needed for authentication
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
      });

      if (response.ok) {
        // Parse the response JSON and pass it to the parent component
        const deletedTrackingInfo = await response.json();
        onAdminAction('delete', deletedTrackingInfo);
      } else {
        // Handle errors, you might want to show an error message to the user
        console.error('Error deleting tracking information:', response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTracking}>
        {/* ... (Same form structure as the previous example) */}
        <button type="submit">Add Tracking</button>
      </form>

      <form onSubmit={handleUpdateTracking}>
        {/* Similar structure for updating tracking information */}
        <button type="submit">Update Tracking</button>
      </form>

      <form onSubmit={handleDeleteTracking}>
        {/* Similar structure for deleting tracking information */}
        <button type="submit">Delete Tracking</button>
      </form>
    </div>
  );
};

export default AdminPanel;
