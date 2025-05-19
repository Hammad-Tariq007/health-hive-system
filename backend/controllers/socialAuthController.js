
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Redirect to Google OAuth
// @route   GET /api/auth/google
// @access  Public
exports.googleAuth = (req, res) => {
  // For demonstration purposes, we'll redirect to a mock URL
  // In a real implementation, this would use passport.js or a similar OAuth library
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.FRONTEND_URL}/api/auth/google/callback&response_type=code&scope=profile email`;
  
  res.json({
    success: true,
    redirectUrl: googleAuthUrl
  });
};

// @desc    Handle Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = async (req, res) => {
  // In a real implementation, this would exchange the code for tokens and extract user info
  // For demonstration, we'll create a mock user or find an existing one
  
  const mockGoogleProfile = {
    name: 'Google User',
    email: 'google.user@gmail.com', 
    googleId: '123456789'
  };
  
  try {
    // Check if user exists
    let user = await User.findOne({ email: mockGoogleProfile.email });
    
    if (!user) {
      // Create new user from Google profile
      user = await User.create({
        name: mockGoogleProfile.name,
        email: mockGoogleProfile.email,
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
        googleId: mockGoogleProfile.googleId
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  } catch (error) {
    console.error('Google auth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=social_auth_error`);
  }
};

// @desc    Redirect to Facebook OAuth
// @route   GET /api/auth/facebook
// @access  Public
exports.facebookAuth = (req, res) => {
  // For demonstration purposes, we'll redirect to a mock URL
  const facebookAuthUrl = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FRONTEND_URL}/api/auth/facebook/callback&scope=email,public_profile`;
  
  res.json({
    success: true,
    redirectUrl: facebookAuthUrl
  });
};

// @desc    Handle Facebook OAuth callback
// @route   GET /api/auth/facebook/callback
// @access  Public
exports.facebookCallback = async (req, res) => {
  // In a real implementation, this would exchange the code for tokens and extract user info
  // For demonstration, we'll create a mock user or find an existing one
  
  const mockFacebookProfile = {
    name: 'Facebook User',
    email: 'facebook.user@gmail.com', 
    facebookId: '123456789'
  };
  
  try {
    // Check if user exists
    let user = await User.findOne({ email: mockFacebookProfile.email });
    
    if (!user) {
      // Create new user from Facebook profile
      user = await User.create({
        name: mockFacebookProfile.name,
        email: mockFacebookProfile.email,
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
        facebookId: mockFacebookProfile.facebookId
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  } catch (error) {
    console.error('Facebook auth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=social_auth_error`);
  }
};
