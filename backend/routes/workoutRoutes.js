
const express = require('express');
const workoutController = require('../controllers/workoutController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all workouts (public)
router.get('/', workoutController.getWorkouts);

// Get single workout (public)
router.get('/:id', workoutController.getWorkout);

// Create workout (admin only)
router.post('/', protect, admin, upload.single('image'), workoutController.createWorkout);

// Update workout (admin only)
router.put('/:id', protect, admin, upload.single('image'), workoutController.updateWorkout);

// Delete workout (admin only)
router.delete('/:id', protect, admin, workoutController.deleteWorkout);

module.exports = router;
