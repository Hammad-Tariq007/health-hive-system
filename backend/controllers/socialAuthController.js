
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fitness-freaks-jwt-secret', {
    expiresIn: '30d'
  });
};

// Initialize Passport strategies
exports.initializeStrategies = () => {
  // Set up passport session serialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Configure Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '123456789012-abc123def456.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOCSPX-abcdefghijklmnopqrstuv',
    callbackURL: `${process.env.API_URL || 'http://localhost:5000'}/api/auth/google/callback`,
    scope: ['profile', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google profile:', profile);
      
      // Check if user exists with this Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // Check if user exists with this email
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        
        if (email) {
          user = await User.findOne({ email });
        }
        
        if (user) {
          // User exists, update with Google ID
          user.googleId = profile.id;
          if (profile.photos && profile.photos.length > 0 && !user.profileImage) {
            user.profileImage = profile.photos[0].value;
          }
          await user.save();
        } else {
          // Create new user
          user = await User.create({
            name: profile.displayName || 'Google User',
            email: email || `${profile.id}@google.com`,
            password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
            googleId: profile.id,
            profileImage: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            lastLogin: new Date()
          });
        }
      } else {
        // Update last login
        user.lastLogin = new Date();
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Google auth error:', error);
      return done(error, false);
    }
  }));

  // Configure Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || '123456789012345',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'abcdef123456789012345678901234',
    callbackURL: `${process.env.API_URL || 'http://localhost:5000'}/api/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Facebook profile:', profile);
      
      // Check if user exists with this Facebook ID
      let user = await User.findOne({ facebookId: profile.id });
      
      if (!user) {
        // Check if user exists with this email
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        
        if (email) {
          user = await User.findOne({ email });
        }
        
        if (user) {
          // User exists, update with Facebook ID
          user.facebookId = profile.id;
          if (profile.photos && profile.photos.length > 0 && !user.profileImage) {
            user.profileImage = profile.photos[0].value;
          }
          await user.save();
        } else {
          // Create new user
          user = await User.create({
            name: profile.displayName || 'Facebook User',
            email: email || `${profile.id}@facebook.com`,
            password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
            facebookId: profile.id,
            profileImage: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            lastLogin: new Date()
          });
        }
      } else {
        // Update last login
        user.lastLogin = new Date();
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Facebook auth error:', error);
      return done(error, false);
    }
  }));
};

// Initialize Passport middleware
exports.initialize = () => {
  return passport.initialize();
};

// @desc    Redirect to Google OAuth
// @route   GET /api/auth/google
// @access  Public
exports.googleAuth = (req, res, next) => {
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })(req, res, next);
};

// @desc    Handle Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err) {
      console.error('Google auth callback error:', err);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=${encodeURIComponent('Authentication failed')}`);
    }
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=${encodeURIComponent('User not found')}`);
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Update last login
    User.findByIdAndUpdate(user._id, { lastLogin: new Date() }).catch(err => {
      console.error('Error updating last login:', err);
    });
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?token=${token}`);
  })(req, res, next);
};

// @desc    Redirect to Facebook OAuth
// @route   GET /api/auth/facebook
// @access  Public
exports.facebookAuth = (req, res, next) => {
  passport.authenticate('facebook', { 
    scope: ['email', 'public_profile'] 
  })(req, res, next);
};

// @desc    Handle Facebook OAuth callback
// @route   GET /api/auth/facebook/callback
// @access  Public
exports.facebookCallback = (req, res, next) => {
  passport.authenticate('facebook', { session: false }, (err, user) => {
    if (err) {
      console.error('Facebook auth callback error:', err);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=${encodeURIComponent('Authentication failed')}`);
    }
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=${encodeURIComponent('User not found')}`);
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Update last login
    User.findByIdAndUpdate(user._id, { lastLogin: new Date() }).catch(err => {
      console.error('Error updating last login:', err);
    });
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?token=${token}`);
  })(req, res, next);
};
