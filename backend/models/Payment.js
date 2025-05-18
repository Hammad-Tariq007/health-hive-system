
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add payment amount']
  },
  currency: {
    type: String,
    required: [true, 'Please add currency'],
    default: 'usd'
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please specify payment method'],
    enum: ['stripe', 'paypal', 'jazzcash', 'easypaisa']
  },
  subscriptionPlan: {
    type: String,
    required: [true, 'Please specify subscription plan'],
    enum: ['pro', 'elite']
  },
  stripePaymentId: {
    type: String
  },
  stripeSubscriptionId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
