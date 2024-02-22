// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrackingPage from './pages/TrackingPage';
import AdminPage from './pages/AdminPage';

//import NotFoundPage from './pages//////NotFoundPage'; // You can create a NotFoundPage component

const App = () => {
  const isAdmin = false; // Replace with your authentication logic

  return (
    <Router>
      <Routes>
        <Route
          path="/"
 element={
            isAdmin ? (
              <AdminPage />
            ) : (
              <TrackingPage />
            )
          }
        />
        <Route path="/about" element={<p>About Us Page</p>} />
        <Route path="/contact" element={<p>Contact Us Page</p>} />
        
      </Routes>
    </Router>
  );
}

export default App;

