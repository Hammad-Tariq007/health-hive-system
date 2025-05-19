
const express = require('express');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', newsletterController.subscribeToNewsletter);

// Unsubscribe from newsletter
router.post('/unsubscribe', newsletterController.unsubscribeFromNewsletter);

module.exports = router;
