
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribeToNewsletter = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Here you would typically save the email to your database
    // For now, we'll just send a notification email

    // Send email to the admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'hammadtariq0118@gmail.com',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p>This user has subscribed to the FitnessFreaks newsletter.</p>
      `
    });

    // Send confirmation email to the subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to FitnessFreaks Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #9b87f5;">Welcome to FitnessFreaks!</h1>
          </div>
          
          <p>Hello${name ? ' ' + name : ''},</p>
          
          <p>Thank you for subscribing to our newsletter! We're excited to have you join our fitness community.</p>
          
          <p>Here's what you can expect:</p>
          <ul>
            <li>Weekly workout tips and routines</li>
            <li>Nutrition advice and healthy recipes</li>
            <li>Motivational content to keep you going</li>
            <li>Early access to new features and promotions</li>
          </ul>
          
          <p>Stay tuned for our next newsletter!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
            <p>FitnessFreaks - Your Partner in Health and Fitness</p>
            <p>If you didn't subscribe to this newsletter, you can <a href="[unsubscribe_link]" style="color: #9b87f5;">unsubscribe here</a>.</p>
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
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter',
      error: error.message
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribeFromNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Here you would typically remove the email from your database
    // For now, we'll just send a confirmation

    // Send unsubscribe confirmation to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'You\'ve been unsubscribed from FitnessFreaks Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #9b87f5;">Unsubscribed from FitnessFreaks Newsletter</h1>
          </div>
          
          <p>Hello,</p>
          
          <p>You have been successfully unsubscribed from the FitnessFreaks newsletter.</p>
          
          <p>We're sorry to see you go! If you have any feedback about why you're leaving, please let us know so we can improve our content.</p>
          
          <p>If you unsubscribed by mistake, you can always <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/newsletter" style="color: #9b87f5;">subscribe again here</a>.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
            <p>FitnessFreaks - Your Partner in Health and Fitness</p>
          </div>
        </div>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter',
      error: error.message
    });
  }
};
