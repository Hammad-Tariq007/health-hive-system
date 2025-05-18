
const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  calories: {
    type: Number,
    required: true
  },
  ingredients: [{
    name: String,
    amount: String
  }],
  instructions: {
    type: String
  },
  image: {
    type: String
  }
});

const NutritionPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  dietType: {
    type: String,
    required: [true, 'Please specify a diet type'],
    enum: [
      'weight-loss',
      'muscle-gain',
      'maintenance',
      'specialized',
      'custom'
    ]
  },
  goal: {
    type: String,
    required: [true, 'Please specify a goal'],
    enum: [
      'fat-loss', 
      'muscle-building', 
      'maintenance', 
      'health-improvement', 
      'performance', 
      'specialized'
    ]
  },
  totalCalories: {
    type: Number,
    required: [true, 'Please add the total calories']
  },
  macros: {
    protein: {
      type: Number,
      required: [true, 'Please add protein macros (in grams)']
    },
    carbs: {
      type: Number,
      required: [true, 'Please add carb macros (in grams)']
    },
    fat: {
      type: Number,
      required: [true, 'Please add fat macros (in grams)']
    }
  },
  meals: [MealSchema],
  image: {
    type: String,
    default: 'default-nutrition.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('NutritionPlan', NutritionPlanSchema);
