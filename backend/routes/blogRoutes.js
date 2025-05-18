
const express = require('express');
const blogController = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all blogs (public)
router.get('/', blogController.getBlogs);

// Get single blog (public)
router.get('/:id', blogController.getBlog);

// Create blog (admin only)
router.post('/', protect, admin, upload.single('image'), blogController.createBlog);

// Update blog (admin only)
router.put('/:id', protect, admin, upload.single('image'), blogController.updateBlog);

// Delete blog (admin only)
router.delete('/:id', protect, admin, blogController.deleteBlog);

module.exports = router;
