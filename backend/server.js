
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fitness-freaks-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize social auth controllers
const socialAuthController = require('./controllers/socialAuthController');
socialAuthController.initializeStrategies();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const blogRoutes = require('./routes/blogRoutes');
const progressRoutes = require('./routes/progressRoutes');
const communityRoutes = require('./routes/communityRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const socialAuthRoutes = require('./routes/socialAuthRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', socialAuthRoutes); // Social auth routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is healthy!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://fitnessfreaks:fitnessfreaks123@cluster0.pw659.mongodb.net/fitnessfreaks?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
