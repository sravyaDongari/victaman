const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware');

// Hardcoded user for simplicity (replace with database authentication)
const hardcodedUser = {
  id: 1,
  username: 'demo_user',
  password: 'demo_password',
};

// Route to handle user login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match the hardcoded user
  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    // Generate a JWT token
    const token = jwt.sign({ userId: hardcodedUser.id, username: hardcodedUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the generated token to the client
    res.json({ token });
  } else {
    // If credentials are incorrect, return an error
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Example protected route using the verifyToken middleware
router.get('/protected-route', verifyToken, (req, res) => {
  // This route is protected and can only be accessed with a valid JWT
  res.json({ message: 'Access granted to protected route', user: req.user });
});

module.exports = router;
