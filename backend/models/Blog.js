
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  image: {
    type: String,
    default: 'default-blog.jpg'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'fitness', 
      'nutrition', 
      'wellness', 
      'motivation', 
      'science', 
      'lifestyle',
      'success-stories'
    ]
  },
  tags: [{
    type: String
  }],
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a text index for search capability
BlogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

module.exports = mongoose.model('Blog', BlogSchema);
