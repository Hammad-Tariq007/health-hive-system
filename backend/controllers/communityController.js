
const CommunityPost = require('../models/CommunityPost');

// @desc    Create a new community post
// @route   POST /api/community
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;

    // Determine media type based on uploaded file
    let mediaType = 'text';
    let mediaUrl = '';
    
    if (req.file) {
      if (req.file.mimetype.startsWith('image')) {
        mediaType = 'image';
      } else if (req.file.mimetype.startsWith('audio')) {
        mediaType = 'audio';
      } else if (req.file.mimetype.startsWith('video')) {
        mediaType = 'video';
      }
      
      mediaUrl = req.file.filename;
    } else if (!content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Post must include either content or media' 
      });
    }

    const post = await CommunityPost.create({
      user: req.user.id,
      content,
      mediaType,
      mediaUrl,
      tags: tags || []
    });

    // Populate user details for the response
    const populatedPost = await CommunityPost.findById(post._id).populate({
      path: 'user',
      select: 'name email profileImage'
    });

    res.status(201).json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all community posts
// @route   GET /api/community
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const { mediaType, tag, search } = req.query;
    
    // Build query object
    const queryObject = {};
    
    if (mediaType && mediaType !== 'all') {
      queryObject.mediaType = mediaType;
    }
    
    if (tag) {
      queryObject.tags = { $in: [tag] };
    }
    
    if (search) {
      queryObject.content = { $regex: search, $options: 'i' };
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Query database
    const posts = await CommunityPost.find(queryObject)
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt')
      .populate({
        path: 'user',
        select: 'name email profileImage'
      });
      
    // Get total count for pagination
    const total = await CommunityPost.countDocuments(queryObject);
    
    // Pagination results
    const pagination = {};
    
    if (startIndex + limit < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.json({
      success: true,
      count: posts.length,
      total,
      pagination,
      posts
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
    if (post.likes.includes(req.user.id)) {
      // Unlike the post
      post.likes = post.likes.filter(
        like => like.toString() !== req.user.id
      );
    } else {
      // Like the post
      post.likes.push(req.user.id);
    }
    
    await post.save();
    
    res.json({
      success: true,
      likes: post.likes.length,
      liked: post.likes.includes(req.user.id)
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Comment on a community post
// @route   POST /api/community/:id/comment
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ success: false, message: 'Comment content is required' });
    }
    
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Add comment
    post.comments.push({
      user: req.user.id,
      content
    });
    
    await post.save();
    
    // Get the newly added comment with user details
    const updatedPost = await CommunityPost.findById(req.params.id).populate({
      path: 'comments.user',
      select: 'name email profileImage'
    });
    
    const newComment = updatedPost.comments[updatedPost.comments.length - 1];
    
    res.json({
      success: true,
      comment: newComment
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete community post
// @route   DELETE /api/community/:id
// @access  Private/Admin or Post Owner
exports.deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id).populate({
      path: 'user',
      select: '_id'
    });
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    // Check if user is post owner or admin
    if (post.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this post' 
      });
    }
    
    await CommunityPost.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Community post successfully deleted'
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
