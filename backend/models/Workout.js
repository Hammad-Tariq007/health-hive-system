
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
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
  duration: {
    type: Number,
    required: [true, 'Please add a duration in minutes']
  },
  image: {
    type: String,
    default: 'default-workout.jpg'
  },
  category: {
    type: String,
    required: [true, 'Please specify a workout category'],
    enum: [
      'strength', 
      'cardio', 
      'flexibility', 
      'hiit', 
      'bodyweight', 
      'yoga', 
      'pilates', 
      'crossfit',
      'other'
    ]
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  equipment: [{
    type: String
  }],
  muscleGroups: [{
    type: String,
    enum: [
      'chest', 
      'back', 
      'shoulders', 
      'arms', 
      'abs', 
      'legs', 
      'glutes', 
      'full-body'
    ]
  }],
  exercises: [{
    name: String,
    sets: Number,
    reps: String,
    restTime: Number,
    instructions: String
  }],
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

module.exports = mongoose.model('Workout', WorkoutSchema);
