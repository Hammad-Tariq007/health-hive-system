
const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .sort('-date')
      .populate('user', 'name email');
    
    res.json({
      success: true,
      count: progress.length,
      progress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create progress entry
// @route   POST /api/progress
// @access  Private
exports.createProgress = async (req, res) => {
  try {
    const { weight, bodyFat, measurement, notes } = req.body;
    
    // Handle uploaded progress photos
    let photos = [];
    if (req.files) {
      photos = req.files.map(file => file.filename);
    }
    
    const progressEntry = await Progress.create({
      user: req.user.id,
      weight: weight ? parseFloat(weight) : undefined,
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      measurement: JSON.parse(measurement || '{}'),
      photos,
      notes
    });
    
    res.status(201).json({
      success: true,
      progress: progressEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update progress entry
// @route   PUT /api/progress/:id
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { weight, bodyFat, measurement, notes } = req.body;
    
    // Find progress entry
    let progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress entry not found' });
    }
    
    // Check if user owns the entry
    if (progress.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this entry' });
    }
    
    // Update fields
    progress.weight = weight ? parseFloat(weight) : progress.weight;
    progress.bodyFat = bodyFat ? parseFloat(bodyFat) : progress.bodyFat;
    progress.measurement = measurement ? JSON.parse(measurement) : progress.measurement;
    progress.notes = notes || progress.notes;
    
    // Handle uploaded progress photos
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => file.filename);
      progress.photos = [...progress.photos, ...newPhotos];
    }
    
    await progress.save();
    
    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete progress entry
// @route   DELETE /api/progress/:id
// @access  Private
exports.deleteProgress = async (req, res) => {
  try {
    // Find progress entry
    const progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress entry not found' });
    }
    
    // Check if user owns the entry
    if (progress.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this entry' });
    }
    
    await Progress.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Progress entry removed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
