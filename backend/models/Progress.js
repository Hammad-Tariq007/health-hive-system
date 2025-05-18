
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number
  },
  calories: {
    type: Number
  },
  workoutsCompleted: {
    type: Number
  },
  waterIntake: {
    type: Number
  },
  bodyMeasurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    thighs: Number,
    arms: Number
  },
  photos: [{
    type: String
  }],
  notes: {
    type: String
  }
});

// Ensure users can only have one progress entry per day
ProgressSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
