const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware to check if the user is authenticated
// You can implement it according to your authentication strategy
const isAuthenticated = require('../middleware/auth');

// Route to register a new user
router.post('/register', userController.register);

// Route to login a user
router.post('/login', userController.login);

// Route to get a user's profile
router.get('/profile', isAuthenticated, userController.getProfile);

// Route to update a user's profile
router.put('/profile', isAuthenticated, userController.updateProfile);

// Route to get a user's transaction history
router.get('/transaction-history', isAuthenticated, userController.getUserTransactionHistory);

// Route to get a user's carbon credit balance
router.get('/carbon-credit-balance', isAuthenticated, userController.getUserCarbonCreditBalance);

module.exports = router;
