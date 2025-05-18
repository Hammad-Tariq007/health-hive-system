
const express = require('express');
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users (admin only)
router.get('/', protect, admin, userController.getUsers);

// Update user role (admin only)
router.put('/:id/role', protect, admin, userController.updateUserRole);

// Delete user (admin only)
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
