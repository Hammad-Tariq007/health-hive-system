
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
  bodyFat: {
    type: Number
  },
  measurement: {
    chest: Number,
    waist: Number,
    hips: Number,
    thighs: Number,
    arms: Number,
    shoulders: Number,
    other: Map
  },
  photos: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Progress', ProgressSchema);
