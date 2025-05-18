
const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create checkout session for subscription
router.post('/', protect, subscriptionController.createCheckoutSession);

// Get subscription status
router.get('/status', protect, subscriptionController.getSubscriptionStatus);

// Complete payment for non-Stripe methods
router.post('/complete', protect, subscriptionController.completePayment);

// Cancel subscription
router.post('/cancel', protect, subscriptionController.cancelSubscription);

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), subscriptionController.handleWebhook);

module.exports = router;
