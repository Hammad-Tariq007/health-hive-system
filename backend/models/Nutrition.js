
const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  dietType: {
    type: String,
    required: [true, 'Please add a diet type'],
    enum: ['weight-loss', 'muscle-gain', 'maintenance', 'specialized', 'custom'],
    default: 'custom'
  },
  totalCalories: {
    type: Number,
    default: 2000
  },
  goal: {
    type: String,
    enum: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Health', 'Performance', 'Custom'],
    default: 'Health'
  },
  duration: {
    type: Number,  // in days
    default: 30
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  suitableFor: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: 'default-nutrition.jpg'
  },
  macros: {
    protein: {
      type: Number, // in grams
      default: 150
    },
    carbs: {
      type: Number, // in grams
      default: 200
    },
    fat: {
      type: Number, // in grams
      default: 65
    }
  },
  meals: [
    {
      name: {
        type: String,
        required: true
      },
      time: {
        type: String,
        default: '8:00 AM'
      },
      calories: {
        type: Number,
        default: 0
      },
      protein: {
        type: Number,
        default: 0
      },
      carbs: {
        type: Number,
        default: 0
      },
      fat: {
        type: Number,
        default: 0
      },
      items: [
        {
          name: String,
          quantity: String,
          calories: Number
        }
      ]
    }
  ],
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

module.exports = mongoose.model('Nutrition', NutritionSchema);
