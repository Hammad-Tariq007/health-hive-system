
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Configure Passport strategies
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.FRONTEND_URL}/api/auth/google/callback`,
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      // Check if user exists with this email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // User exists, update with Google ID
        user.googleId = profile.id;
        await user.save();
      } else {
        // Create new user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
          googleId: profile.id,
          profileImage: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : undefined
        });
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.FRONTEND_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists with this Facebook ID
    let user = await User.findOne({ facebookId: profile.id });
    
    if (!user && profile.emails && profile.emails.length > 0) {
      // Check if user exists with this email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // User exists, update with Facebook ID
        user.facebookId = profile.id;
        await user.save();
      } else {
        // Create new user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@facebook.com`,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
          facebookId: profile.id,
          profileImage: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : undefined
        });
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Initialize Passport middleware
exports.initialize = () => {
  return passport.initialize();
};

// @desc    Redirect to Google OAuth
// @route   GET /api/auth/google
// @access  Public
exports.googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email'] 
});

// @desc    Handle Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err) {
      console.error('Google auth error:', err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=social_auth_error`);
    }
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=user_not_found`);
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  })(req, res, next);
};

// @desc    Redirect to Facebook OAuth
// @route   GET /api/auth/facebook
// @access  Public
exports.facebookAuth = passport.authenticate('facebook', { 
  scope: ['email', 'public_profile'] 
});

// @desc    Handle Facebook OAuth callback
// @route   GET /api/auth/facebook/callback
// @access  Public
exports.facebookCallback = (req, res, next) => {
  passport.authenticate('facebook', { session: false }, (err, user) => {
    if (err) {
      console.error('Facebook auth error:', err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=social_auth_error`);
    }
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=user_not_found`);
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  })(req, res, next);
};
