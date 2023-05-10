const express = require('express');
const router = express.Router();

const {
  initiateOffsetTransaction,
  getAvailableCarbonCredits,
  getUserTransactions,
  getTransactionDetails,
  getTransactionReceipt,
  checkAPIKey,
  rateLimit
} = require('./helper');

// Middleware for API key authentication
router.use(checkAPIKey);

// Middleware for rate limiting
router.use(rateLimit);

// Endpoint to initiate a carbon offset transaction
router.post('/offset-transaction', async (req, res, next) => {
  try {
    const { receiverAddress, amount, receiverNetwork, offsetType, offsetAmount, carbonCreditType } = req.body;
    const transactionId = await initiateOffsetTransaction(receiverAddress, amount, receiverNetwork, offsetType, offsetAmount, carbonCreditType);
    res.status(200).json({
      status: 'success',
      message: 'Offset transaction initiated.',
      transactionId
    });
  } catch (error) {
    next(error);
  }
});

// Endpoint to retrieve available carbon credit types
router.get('/carbon-credits', async (_, res, next) => {
  try {
    const carbonCredits = await getAvailableCarbonCredits();
    res.status(200).json(carbonCredits);
  } catch (error) {
    next(error);
  }
});

// Endpoint to get a list of offset transactions for a specific user address
router.get('/transactions/:userAddress', async (req, res, next) => {
  try {
    const { userAddress } = req.params;
    const transactions = await getUserTransactions(userAddress);
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
});

// Endpoint to fetch details of a specific offset transaction
router.get('/transaction/:transactionId', async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const transaction = await getTransactionDetails(transactionId);
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
});

// Endpoint to retrieve an interchain NFT receipt for a specific transaction
router.get('/receipt/:receiptId', async (req, res, next) => {
  try {
    const { receiptId } = req.params;
    const receipt = await getTransactionReceipt(receiptId);
    res.status(200).json(receipt);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

module.exports = router;
