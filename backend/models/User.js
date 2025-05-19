
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
  gender: {
    type: String,
    enum: ['male', 'female', 'other', ''],
    default: ''
  },
  age: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null
  },
  weight: {
    type: Number,
    default: null
  },
  profileImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  fitnessGoal: {
    type: String,
    default: ''
  },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'pro', 'elite'],
    default: 'free'
  },
  subscriptionDate: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  googleId: {
    type: String,
    default: null
  },
  facebookId: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  // Only hash the password if it's been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
