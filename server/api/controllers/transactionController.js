const TransactionService = require('../services/transactionService');

exports.createTransaction = async (req, res, next) => {
  try {
    const { receiverAddress, amount, receiverNetwork, offsetType, offsetAmount, carbonCreditType } = req.body;
    const transaction = await TransactionService.offsetTransaction(
      req.user.contractAddress,
      {
        receiver_address: receiverAddress,
        amount: amount,
        receiver_network: receiverNetwork,
        offset_type: offsetType,
        offset_amount: offsetAmount,
        carbon_credit_type: carbonCreditType,
      }
    );
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const transaction = await TransactionService.getOffsetTransaction(req.user.contractAddress, transactionId);
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.addCarbonCreditsToPool = async (req, res, next) => {
  try {
    const { amount, carbonCreditType } = req.body;
    const result = await TransactionService.addCarbonCreditsToPool(req.user.contractAddress, amount, carbonCreditType);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCarbonCreditsPool = async (req, res, next) => {
  try {
    const result = await TransactionService.getCarbonCreditsPool(req.user.contractAddress);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.burnCarbonCredits = async (req, res, next) => {
  try {
    const { amount, carbonCreditType } = req.body;
    const result = await TransactionService.burnCarbonCredits(req.user.contractAddress, amount, carbonCreditType);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
