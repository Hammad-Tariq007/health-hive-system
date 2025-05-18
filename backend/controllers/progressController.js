
const Progress = require('../models/Progress');

// @desc    Create a new progress entry
// @route   POST /api/progress
// @access  Private
exports.createProgress = async (req, res) => {
  try {
    const { 
      weight, 
      calories, 
      workoutsCompleted, 
      waterIntake,
      bodyMeasurements,
      notes
    } = req.body;
    
    // Format date to be start of day for consistent tracking
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    // Check if entry already exists for this date
    let progress = await Progress.findOne({
      user: req.user.id,
      date: {
        $gte: new Date(date),
        $lt: new Date(date).setDate(date.getDate() + 1)
      }
    });

    if (progress) {
      // Update existing entry
      progress.weight = weight || progress.weight;
      progress.calories = calories || progress.calories;
      progress.workoutsCompleted = workoutsCompleted || progress.workoutsCompleted;
      progress.waterIntake = waterIntake || progress.waterIntake;
      
      if (bodyMeasurements) {
        progress.bodyMeasurements = {
          ...progress.bodyMeasurements,
          ...bodyMeasurements
        };
      }
      
      if (notes) progress.notes = notes;
      
      // Handle progress photos if uploaded
      if (req.files && req.files.length > 0) {
        const photos = req.files.map(file => file.filename);
        progress.photos = [...progress.photos, ...photos];
      }
      
      await progress.save();
      
      return res.json({
        success: true,
        message: 'Progress entry updated',
        progress
      });
    }

    // Create new progress entry
    progress = await Progress.create({
      user: req.user.id,
      date,
      weight,
      calories,
      workoutsCompleted,
      waterIntake,
      bodyMeasurements,
      notes,
      photos: req.files ? req.files.map(file => file.filename) : []
    });

    res.status(201).json({
      success: true,
      progress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all progress entries for a user
// @route   GET /api/progress
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Build query object
    const queryObject = { user: req.user.id };
    
    // Add date range if provided
    if (startDate || endDate) {
      queryObject.date = {};
      
      if (startDate) {
        queryObject.date.$gte = new Date(startDate);
      }
      
      if (endDate) {
        queryObject.date.$lte = new Date(endDate);
      }
    }
    
    // Get progress entries
    const progress = await Progress.find(queryObject).sort('-date');
    
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

// @desc    Update progress entry
// @route   PUT /api/progress/:id
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    let progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress entry not found' });
    }
    
    // Check if entry belongs to user
    if (progress.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this progress entry' });
    }
    
    // Update entry
    const { weight, calories, workoutsCompleted, waterIntake, bodyMeasurements, notes } = req.body;
    
    if (weight !== undefined) progress.weight = weight;
    if (calories !== undefined) progress.calories = calories;
    if (workoutsCompleted !== undefined) progress.workoutsCompleted = workoutsCompleted;
    if (waterIntake !== undefined) progress.waterIntake = waterIntake;
    
    if (bodyMeasurements) {
      progress.bodyMeasurements = {
        ...progress.bodyMeasurements,
        ...bodyMeasurements
      };
    }
    
    if (notes !== undefined) progress.notes = notes;
    
    // Handle progress photos if uploaded
    if (req.files && req.files.length > 0) {
      const photos = req.files.map(file => file.filename);
      progress.photos = [...progress.photos, ...photos];
    }
    
    await progress.save();
    
    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Progress entry not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
