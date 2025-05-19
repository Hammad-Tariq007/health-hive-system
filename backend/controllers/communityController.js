
const CommunityPost = require('../models/Community');
const User = require('../models/User');

// @desc    Get all community posts
// @route   GET /api/community
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .sort('-createdAt')
      .populate('user', 'name email profileImage')
      .populate('comments.user', 'name profileImage');
    
    res.json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single community post
// @route   GET /api/community/:id
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('user', 'name email profileImage')
      .populate('comments.user', 'name profileImage');
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create new community post
// @route   POST /api/community
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { text, tags } = req.body;
    
    // Handle media upload
    let media = [];
    let mediaType = 'none';
    
    if (req.files && req.files.length > 0) {
      media = req.files.map(file => file.filename);
      
      // Determine media type based on first file's mimetype
      const mimeType = req.files[0].mimetype;
      if (mimeType.startsWith('image/')) {
        mediaType = 'image';
      } else if (mimeType.startsWith('video/')) {
        mediaType = 'video';
      } else if (mimeType.startsWith('audio/')) {
        mediaType = 'audio';
      }
    }
    
    const post = await CommunityPost.create({
      user: req.user.id,
      text,
      mediaType,
      media,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });
    
    // Populate user data
    const populatedPost = await CommunityPost.findById(post._id).populate('user', 'name email profileImage');
    
    res.status(201).json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update community post
// @route   PUT /api/community/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    const { text, tags } = req.body;
    
    let post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Check if user owns the post
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this post' });
    }
    
    // Update text and tags
    post.text = text || post.text;
    post.tags = tags ? tags.split(',').map(tag => tag.trim()) : post.tags;
    
    // Handle media upload
    if (req.files && req.files.length > 0) {
      const newMedia = req.files.map(file => file.filename);
      post.media = [...post.media, ...newMedia];
      
      // Update media type if it was 'none' before
      if (post.mediaType === 'none') {
        const mimeType = req.files[0].mimetype;
        if (mimeType.startsWith('image/')) {
          post.mediaType = 'image';
        } else if (mimeType.startsWith('video/')) {
          post.mediaType = 'video';
        } else if (mimeType.startsWith('audio/')) {
          post.mediaType = 'audio';
        }
      }
    }
    
    await post.save();
    
    // Populate user data
    const populatedPost = await CommunityPost.findById(post._id)
      .populate('user', 'name email profileImage')
      .populate('comments.user', 'name profileImage');
    
    res.json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete community post
// @route   DELETE /api/community/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Check if user owns the post or is admin
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this post' });
    }
    
    await CommunityPost.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Post removed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Like a community post
// @route   POST /api/community/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Check if post has already been liked by this user
    if (post.likes.some(like => like.toString() === req.user.id)) {
      // Unlike the post
      post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    } else {
      // Like the post
      post.likes.unshift(req.user.id);
    }
    
    await post.save();
    
    res.json({
      success: true,
      likes: post.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Add comment to community post
// @route   POST /api/community/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }
    
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Add comment
    post.comments.unshift({
      user: req.user.id,
      text
    });
    
    await post.save();
    
    // Populate user data
    const populatedPost = await CommunityPost.findById(post._id).populate('comments.user', 'name profileImage');
    
    res.json({
      success: true,
      comments: populatedPost.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete comment from community post
// @route   DELETE /api/community/:id/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Find comment
    const comment = post.comments.find(comment => comment.id === req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    
    // Check if user owns the comment or post or is admin
    if (comment.user.toString() !== req.user.id && 
        post.user.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this comment' });
    }
    
    // Remove comment
    post.comments = post.comments.filter(comment => comment.id !== req.params.commentId);
    
    await post.save();
    
    res.json({
      success: true,
      comments: post.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
