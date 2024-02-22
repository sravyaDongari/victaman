const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // User authentication routes
const trackingRoutes = require('./routes/trackingRoutes'); // Tracking routes
const adminRoutes = require('./routes/adminRoutes'); // Admin routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/auth', authRoutes);
app.use('/track', trackingRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
