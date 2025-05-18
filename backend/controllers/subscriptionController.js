
const Stripe = require('stripe');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Initialize stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create checkout session for subscription
// @route   POST /api/subscribe
// @access  Private
exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan, paymentMethod } = req.body;
    
    // Validate plan
    if (!['pro', 'elite'].includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }
    
    // Set price based on plan
    let priceId, amount;
    if (plan === 'pro') {
      amount = 999; // $9.99 per month
    } else {
      amount = 1999; // $19.99 per month
    }

    // Handle different payment methods
    if (paymentMethod === 'stripe') {
      // Find or create a Stripe customer
      const user = await User.findById(req.user.id);
      let customer;
      
      if (user.stripeCustomerId) {
        customer = await stripe.customers.retrieve(user.stripeCustomerId);
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: user.id
          }
        });
        
        // Update user with Stripe customer ID
        user.stripeCustomerId = customer.id;
        await user.save();
      }
      
      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Subscription`,
                description: plan === 'pro' ? 'Monthly subscription to Pro plan' : 'Monthly subscription to Elite plan',
              },
              unit_amount: amount,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/subscribe/cancel`,
      });
      
      // Create a payment record (pending)
      await Payment.create({
        user: req.user.id,
        amount,
        currency: 'usd',
        paymentMethod: 'stripe',
        subscriptionPlan: plan,
        stripePaymentId: session.id,
        status: 'pending',
      });
      
      // Return checkout URL
      return res.json({
        success: true,
        sessionId: session.id,
        url: session.url,
      });
    } 
    else if (['jazzcash', 'easypaisa'].includes(paymentMethod)) {
      // For jazzcash/easypaisa, we would typically create a pending payment record
      // and then return a URL or instructions for the mobile payment
      
      // This is a placeholder implementation - you would integrate with these services
      const payment = await Payment.create({
        user: req.user.id,
        amount,
        currency: 'pkr', // Pakistani Rupee
        paymentMethod,
        subscriptionPlan: plan,
        status: 'pending',
      });
      
      return res.json({
        success: true,
        paymentId: payment._id,
        // This would typically be a redirect URL to the payment gateway
        message: `Please complete your payment using ${paymentMethod}`,
        instructions: `Send PKR ${amount * 0.0037} to account: 03XX-XXXXXXX` // Example conversion rate
      });
    } 
    else {
      return res.status(400).json({ success: false, message: 'Invalid payment method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Verify subscription status
// @route   GET /api/subscribe/status
// @access  Private
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // If user has a Stripe customer ID, check their subscription status
    if (user.stripeCustomerId) {
      // Get all subscriptions for this customer
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active',
        limit: 1
      });
      
      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        const product = await stripe.products.retrieve(subscription.items.data[0].price.product);
        
        let plan;
        if (product.name.toLowerCase().includes('pro')) {
          plan = 'pro';
        } else if (product.name.toLowerCase().includes('elite')) {
          plan = 'elite';
        } else {
          plan = 'free';
        }
        
        // Update user's subscription status if it doesn't match
        if (user.subscriptionPlan !== plan) {
          user.subscriptionPlan = plan;
          await user.save();
        }
        
        // Get end of current period
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
        
        return res.json({
          success: true,
          subscribed: true,
          plan,
          currentPeriodEnd
        });
      }
    }
    
    // Check for other payment methods that might be active
    const activePayment = await Payment.findOne({
      user: user._id,
      status: 'completed',
      endDate: { $gt: new Date() }
    }).sort('-endDate');
    
    if (activePayment) {
      // Update user's subscription status if it doesn't match
      if (user.subscriptionPlan !== activePayment.subscriptionPlan) {
        user.subscriptionPlan = activePayment.subscriptionPlan;
        await user.save();
      }
      
      return res.json({
        success: true,
        subscribed: true,
        plan: activePayment.subscriptionPlan,
        currentPeriodEnd: activePayment.endDate
      });
    }
    
    // If no active subscription found
    if (user.subscriptionPlan !== 'free') {
      user.subscriptionPlan = 'free';
      await user.save();
    }
    
    res.json({
      success: true,
      subscribed: false,
      plan: 'free'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Handle webhook events from Stripe
// @route   POST /api/subscribe/webhook
// @access  Public (but verified by Stripe signature)
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Update payment status to completed
      await Payment.findOneAndUpdate(
        { stripePaymentId: session.id },
        { 
          status: 'completed',
          stripeSubscriptionId: session.subscription,
          startDate: new Date(),
          // Add 30 days for subscription end (this is simplified)
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      );
      
      // Update user's subscription plan
      if (session.customer) {
        const user = await User.findOne({ stripeCustomerId: session.customer });
        if (user) {
          // Determine plan from session
          // In a real implementation, you'd fetch the subscription details to determine the plan
          user.subscriptionPlan = 'pro'; // Placeholder - you'd determine this from subscription
          await user.save();
        }
      }
      break;
      
    case 'customer.subscription.updated':
      // Handle subscription updates
      break;
      
    case 'customer.subscription.deleted':
      // Handle subscription cancellations
      const subscription = event.data.object;
      
      // Find user with this subscription
      const payment = await Payment.findOne({ stripeSubscriptionId: subscription.id });
      if (payment) {
        // Update payment status
        payment.status = 'cancelled';
        payment.endDate = new Date();
        await payment.save();
        
        // Update user's subscription plan
        const user = await User.findById(payment.user);
        if (user) {
          user.subscriptionPlan = 'free';
          await user.save();
        }
      }
      break;
  }

  res.json({ received: true });
};

// @desc    Complete payment for non-Stripe methods
// @route   POST /api/subscribe/complete
// @access  Private
exports.completePayment = async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body;
    
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to complete this payment' });
    }
    
    // In a real implementation, you would verify the transaction ID with the payment service
    
    // Update payment status
    payment.status = 'completed';
    payment.startDate = new Date();
    payment.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days subscription
    await payment.save();
    
    // Update user's subscription plan
    const user = await User.findById(req.user.id);
    user.subscriptionPlan = payment.subscriptionPlan;
    await user.save();
    
    res.json({
      success: true,
      subscribed: true,
      plan: payment.subscriptionPlan,
      currentPeriodEnd: payment.endDate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Cancel subscription
// @route   POST /api/subscribe/cancel
// @access  Private
exports.cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // If user has a Stripe subscription
    if (user.stripeCustomerId) {
      // Get active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active',
        limit: 1
      });
      
      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        
        // Cancel at period end instead of immediately
        await stripe.subscriptions.update(subscription.id, {
          cancel_at_period_end: true
        });
        
        return res.json({
          success: true,
          message: 'Subscription will be canceled at the end of the billing period',
          currentPeriodEnd: new Date(subscription.current_period_end * 1000)
        });
      }
    }
    
    // For non-Stripe payments
    const activePayment = await Payment.findOne({
      user: user._id,
      status: 'completed',
      endDate: { $gt: new Date() }
    });
    
    if (activePayment) {
      activePayment.status = 'cancelled';
      await activePayment.save();
      
      user.subscriptionPlan = 'free';
      await user.save();
      
      return res.json({
        success: true,
        message: 'Subscription has been canceled'
      });
    }
    
    res.status(404).json({ success: false, message: 'No active subscription found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
