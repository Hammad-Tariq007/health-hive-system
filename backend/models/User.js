
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'pro', 'elite'],
    default: 'free'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profileImage: {
    type: String,
    default: 'default-avatar.png'
  },
  bio: {
    type: String,
    default: ''
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  fitnessGoal: {
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'maintenance', 'general-fitness', 'other'],
    default: 'general-fitness'
  },
  stripeCustomerId: {
    type: String
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
