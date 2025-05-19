
const express = require('express');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', newsletterController.subscribeToNewsletter);

module.exports = router;
