const TransactionService = require('../services/transactionService');

exports.getUserTransactionHistory = async (req, res, next) => {
  try {
    const transactions = await TransactionService.getUserTransactions(req.user.contractAddress);
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

exports.getUserCarbonCreditBalance = async (req, res, next) => {
  try {
    const balance = await TransactionService.getUserCarbonCreditBalance(req.user.contractAddress);
    res.status(200).json({ balance });
  } catch (err) {
    next(err);
  }
};
