
const nodemailer = require('nodemailer');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'app@gmail.com', 
    pass: process.env.EMAIL_PASSWORD || 'app_password',
  }
});

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    
    // In a production environment, you should store this email in a database
    // For now, just send notification to admin
    
    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'app@gmail.com',
      to: 'hammadtariq0118@gmail.com', // Admin email
      subject: 'New Newsletter Subscription',
      html: `
        <h1>New Newsletter Subscription</h1>
        <p>A new user has subscribed to your newsletter!</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    });
    
    // Send confirmation email to subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'app@gmail.com',
      to: email,
      subject: 'Welcome to FitnessFreaks Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6d28d9; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">FitnessFreaks</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <h2>Welcome to Our Newsletter!</h2>
            <p>Thank you for subscribing to the FitnessFreaks newsletter. You'll now receive the latest fitness tips, workout plans, and exclusive offers straight to your inbox.</p>
            <p>Stay fit and healthy!</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096;">
              <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
              <p>© ${new Date().getFullYear()} FitnessFreaks. All rights reserved.</p>
            </div>
          </div>
        </div>
      `
    });
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribeFromNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // In a production environment, you would remove this email from the newsletter database
    // For now, we'll just send a notification
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'app@gmail.com',
      to: 'hammadtariq0118@gmail.com',
      subject: 'Newsletter Unsubscription',
      html: `
        <h1>Newsletter Unsubscription</h1>
        <p>A user has unsubscribed from your newsletter</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    });
    
    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
