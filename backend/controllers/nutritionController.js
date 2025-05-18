
const NutritionPlan = require('../models/NutritionPlan');

// @desc    Create a new nutrition plan
// @route   POST /api/nutrition
// @access  Private/Admin
exports.createNutritionPlan = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      dietType, 
      goal, 
      totalCalories, 
      macros,
      meals 
    } = req.body;

    // Handle nutrition plan image if uploaded
    let image = 'default-nutrition.jpg';
    if (req.file) {
      image = req.file.filename;
    }

    const nutritionPlan = await NutritionPlan.create({
      title,
      description,
      dietType,
      goal,
      totalCalories,
      macros,
      meals: meals || [],
      image,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      nutritionPlan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all nutrition plans
// @route   GET /api/nutrition
// @access  Public
exports.getNutritionPlans = async (req, res) => {
  try {
    const { dietType, goal, search } = req.query;
    
    // Build query object
    const queryObject = {};
    
    if (dietType) {
      queryObject.dietType = dietType;
    }
    
    if (goal) {
      queryObject.goal = goal;
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
    const nutritionPlans = await NutritionPlan.find(queryObject)
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt')
      .populate({
        path: 'createdBy',
        select: 'name email'
      });
      
    // Get total count for pagination
    const total = await NutritionPlan.countDocuments(queryObject);
    
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
      count: nutritionPlans.length,
      total,
      pagination,
      nutritionPlans
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single nutrition plan by ID
// @route   GET /api/nutrition/:id
// @access  Public
exports.getNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findById(req.params.id).populate({
      path: 'createdBy',
      select: 'name email'
    });
    
    if (!nutritionPlan) {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    res.json({
      success: true,
      nutritionPlan
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update nutrition plan
// @route   PUT /api/nutrition/:id
// @access  Private/Admin
exports.updateNutritionPlan = async (req, res) => {
  try {
    let nutritionPlan = await NutritionPlan.findById(req.params.id);
    
    if (!nutritionPlan) {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    const updateData = { ...req.body };
    
    // Handle nutrition plan image if uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }
    
    nutritionPlan = await NutritionPlan.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      nutritionPlan
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete nutrition plan
// @route   DELETE /api/nutrition/:id
// @access  Private/Admin
exports.deleteNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findById(req.params.id);
    
    if (!nutritionPlan) {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    await NutritionPlan.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Nutrition plan successfully deleted'
    });
  } catch (error) {
    console.error(error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
