
const Nutrition = require('../models/Nutrition');
const User = require('../models/User');

// @desc    Get all nutrition plans
// @route   GET /api/nutrition
// @access  Public
exports.getNutritionPlans = async (req, res) => {
  try {
    const { dietType } = req.query;
    
    let query = {};
    if (dietType) {
      query.dietType = dietType;
    }
    
    const nutritionPlans = await Nutrition.find(query).sort('-createdAt');
    
    res.json({
      success: true,
      count: nutritionPlans.length,
      nutritionPlans
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single nutrition plan
// @route   GET /api/nutrition/:id
// @access  Public
exports.getNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = await Nutrition.findById(req.params.id);
    
    if (!nutritionPlan) {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    res.json({
      success: true,
      nutritionPlan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create nutrition plan
// @route   POST /api/nutrition
// @access  Private/Admin
exports.createNutritionPlan = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      dietType, 
      totalCalories, 
      goal, 
      duration,
      difficulty,
      suitableFor,
      macros,
      meals 
    } = req.body;
    
    // Handle image upload
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }
    
    // Parse complex objects from form data
    let parsedMacros = macros;
    let parsedMeals = meals;
    
    if (typeof macros === 'string') {
      try {
        parsedMacros = JSON.parse(macros);
      } catch (err) {
        console.error('Error parsing macros:', err);
      }
    }
    
    if (typeof meals === 'string') {
      try {
        parsedMeals = JSON.parse(meals);
      } catch (err) {
        console.error('Error parsing meals:', err);
      }
    }
    
    const nutritionPlan = await Nutrition.create({
      title,
      description,
      dietType,
      totalCalories: totalCalories ? parseFloat(totalCalories) : undefined,
      goal,
      duration: duration ? parseInt(duration) : undefined,
      difficulty,
      suitableFor: suitableFor ? suitableFor.split(',') : [],
      image,
      macros: parsedMacros,
      meals: parsedMeals,
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

// @desc    Update nutrition plan
// @route   PUT /api/nutrition/:id
// @access  Private/Admin
exports.updateNutritionPlan = async (req, res) => {
  try {
    let nutritionPlan = await Nutrition.findById(req.params.id);
    
    if (!nutritionPlan) {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    const { 
      title, 
      description, 
      dietType, 
      totalCalories, 
      goal, 
      duration,
      difficulty,
      suitableFor,
      macros,
      meals 
    } = req.body;
    
    // Handle image upload
    if (req.file) {
      nutritionPlan.image = req.file.filename;
    }
    
    // Parse complex objects from form data
    let parsedMacros = macros;
    let parsedMeals = meals;
    
    if (typeof macros === 'string') {
      try {
        parsedMacros = JSON.parse(macros);
      } catch (err) {
        console.error('Error parsing macros:', err);
      }
    }
    
    if (typeof meals === 'string') {
      try {
        parsedMeals = JSON.parse(meals);
      } catch (err) {
        console.error('Error parsing meals:', err);
      }
    }
    
    // Update fields
    if (title) nutritionPlan.title = title;
    if (description) nutritionPlan.description = description;
    if (dietType) nutritionPlan.dietType = dietType;
    if (totalCalories) nutritionPlan.totalCalories = parseFloat(totalCalories);
    if (goal) nutritionPlan.goal = goal;
    if (duration) nutritionPlan.duration = parseInt(duration);
    if (difficulty) nutritionPlan.difficulty = difficulty;
    if (suitableFor) nutritionPlan.suitableFor = suitableFor.split(',');
    if (parsedMacros) nutritionPlan.macros = parsedMacros;
    if (parsedMeals) nutritionPlan.meals = parsedMeals;
    
    await nutritionPlan.save();
    
    res.json({
      success: true,
      nutritionPlan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete nutrition plan
// @route   DELETE /api/nutrition/:id
// @access  Private/Admin
exports.deleteNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = await Nutrition.findById(req.params.id);
    
    if (!nutritionPlan) {
      return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
    }
    
    await Nutrition.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Nutrition plan removed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
