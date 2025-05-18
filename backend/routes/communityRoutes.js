
const express = require('express');
const communityController = require('../controllers/communityController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all posts (public)
router.get('/', communityController.getPosts);

// Create post (auth required)
router.post('/', protect, upload.single('media'), communityController.createPost);

// Like a post (auth required)
router.post('/:id/like', protect, communityController.likePost);

// Comment on a post (auth required)
router.post('/:id/comment', protect, communityController.addComment);

// Delete post (admin or post owner)
router.delete('/:id', protect, communityController.deletePost);

module.exports = router;
