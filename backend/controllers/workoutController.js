
const Workout = require('../models/Workout');

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private/Admin
exports.createWorkout = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      duration, 
      category,
      difficulty,
      equipment,
      muscleGroups,
      exercises
    } = req.body;

    // Handle workout image if uploaded
    let image = 'default-workout.jpg';
    if (req.file) {
      image = req.file.filename;
    }

    const workout = await Workout.create({
      title,
      description,
      duration,
      category,
      image,
      difficulty,
      equipment: equipment || [],
      muscleGroups: muscleGroups || [],
      exercises: exercises || [],
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      workout
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Public
exports.getWorkouts = async (req, res) => {
  try {
    const { category, difficulty, muscleGroup, search } = req.query;
    
    // Build query object
    const queryObject = {};
    
    if (category) {
      queryObject.category = category;
    }
    
    if (difficulty) {
      queryObject.difficulty = difficulty;
    }
    
    if (muscleGroup) {
      queryObject.muscleGroups = { $in: [muscleGroup] };
    }
    
    if (search) {
      queryObject.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Query database
    const workouts = await Workout.find(queryObject)
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt')
      .populate({
        path: 'createdBy',
        select: 'name email'
      });
      
    // Get total count for pagination
    const total = await Workout.countDocuments(queryObject);
    
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
      count: workouts.length,
      total,
      pagination,
      workouts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single workout by ID
// @route   GET /api/workouts/:id
// @access  Public
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate({
      path: 'createdBy',
      select: 'name email'
    });
    
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    
    res.json({
      success: true,
      workout
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private/Admin
exports.updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    
    const updateData = { ...req.body };
    
    // Handle workout image if uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }
    
    workout = await Workout.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      workout
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private/Admin
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    
    await Workout.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Workout successfully deleted'
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
