
const Blog = require('../models/Blog');

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, published } = req.body;

    // Handle blog image if uploaded
    let image = 'default-blog.jpg';
    if (req.file) {
      image = req.file.filename;
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      image,
      author: req.user.id,
      category,
      tags: tags || [],
      published: published !== undefined ? published : true
    });

    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all blog posts with pagination
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
  try {
    const { category, tag, search, published } = req.query;
    
    // Build query object
    const queryObject = {};
    
    if (category) {
      queryObject.category = category;
    }
    
    if (tag) {
      queryObject.tags = { $in: [tag] };
    }
    
    if (search) {
      queryObject.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only return published posts for public users
    if (req.user && req.user.role === 'admin') {
      // Admin can filter by published status
      if (published !== undefined) {
        queryObject.published = published === 'true';
      }
    } else {
      // Non-admin users can only see published posts
      queryObject.published = true;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Query database
    const blogs = await Blog.find(queryObject)
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt')
      .populate({
        path: 'author',
        select: 'name email'
      });
      
    // Get total count for pagination
    const total = await Blog.countDocuments(queryObject);
    
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
      count: blogs.length,
      total,
      pagination,
      blogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single blog post by ID
// @route   GET /api/blogs/:id
// @access  Public (with restrictions)
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: 'author',
      select: 'name email'
    });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    // Only admins can see unpublished posts
    if (!blog.published && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    const updateData = { ...req.body };
    updateData.updatedAt = Date.now();
    
    // Handle blog image if uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }
    
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate({
      path: 'author',
      select: 'name email'
    });
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Blog post successfully deleted'
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
