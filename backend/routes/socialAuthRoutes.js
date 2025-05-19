
const express = require('express');
const socialAuthController = require('../controllers/socialAuthController');

const router = express.Router();

// Google OAuth routes
router.get('/google', socialAuthController.googleAuth);
router.get('/google/callback', socialAuthController.googleCallback);

// Facebook OAuth routes
router.get('/facebook', socialAuthController.facebookAuth);
router.get('/facebook/callback', socialAuthController.facebookCallback);

module.exports = router;
