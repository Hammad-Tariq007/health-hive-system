
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Register user
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], authController.register);

// Login user
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], authController.login);

// Get current user
router.get('/me', protect, authController.getMe);

// Update profile
router.put('/profile', protect, upload.single('image'), authController.updateProfile);

// Delete account
router.delete('/delete', protect, authController.deleteAccount);

module.exports = router;
