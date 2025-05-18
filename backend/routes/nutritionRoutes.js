
const express = require('express');
const nutritionController = require('../controllers/nutritionController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all nutrition plans (public)
router.get('/', nutritionController.getNutritionPlans);

// Get single nutrition plan (public)
router.get('/:id', nutritionController.getNutritionPlan);

// Create nutrition plan (admin only)
router.post('/', protect, admin, upload.single('image'), nutritionController.createNutritionPlan);

// Update nutrition plan (admin only)
router.put('/:id', protect, admin, upload.single('image'), nutritionController.updateNutritionPlan);

// Delete nutrition plan (admin only)
router.delete('/:id', protect, admin, nutritionController.deleteNutritionPlan);

module.exports = router;
