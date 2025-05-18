
const express = require('express');
const progressController = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get progress history (private)
router.get('/', protect, progressController.getProgress);

// Create progress entry (private)
router.post('/', protect, upload.array('photos', 5), progressController.createProgress);

// Update progress entry (private)
router.put('/:id', protect, upload.array('photos', 5), progressController.updateProgress);

module.exports = router;
