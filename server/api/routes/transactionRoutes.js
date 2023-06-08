const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Middleware to check if the user is authenticated
// You can implement it according to your authentication strategy
const isAuthenticated = require('../middleware/auth');

// Route to calculate the carbon offset
router.post('/calculate-offset', isAuthenticated, transactionController.calculateOffset);

// Route to select carbon credits
router.post('/select-credit', isAuthenticated, transactionController.selectCredit);

// Route to create a new transaction and generate the receipt
router.post('/create', isAuthenticated, transactionController.createTransaction);

// Route to get a transaction by its ID
router.get('/:transactionId', isAuthenticated, transactionController.getTransactionById);

module.exports = router;
