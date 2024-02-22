const jwt = require('jsonwebtoken');

// Middleware to check if the request has a valid JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
