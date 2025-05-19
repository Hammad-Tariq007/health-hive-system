
const express = require('express');
const communityController = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all posts
router.get('/', communityController.getPosts);

// Get single post
router.get('/:id', communityController.getPost);

// Create post (requires authentication)
router.post('/', protect, upload.array('media', 5), communityController.createPost);

// Update post (requires authentication)
router.put('/:id', protect, upload.array('media', 5), communityController.updatePost);

// Delete post (requires authentication)
router.delete('/:id', protect, communityController.deletePost);

// Like post (requires authentication)
router.post('/:id/like', protect, communityController.likePost);

// Add comment to post (requires authentication)
router.post('/:id/comments', protect, communityController.addComment);

// Delete comment from post (requires authentication)
router.delete('/:id/comments/:commentId', protect, communityController.deleteComment);

module.exports = router;
