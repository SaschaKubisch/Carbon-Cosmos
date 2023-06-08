const TransactionService = require('../services/transactionService');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    // Register logic
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res, next) => {
  try {
    // Login logic
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate an authentication token
    const token = user.generateAuthToken();

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    // Get profile logic
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    // Update profile logic
    const { username, email } = req.body;

    const user = await User.findById(req.user.id);
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserTransactionHistory = async (req, res, next) => {
  try {
    const transactions = await TransactionService.getUserTransactions(req.user.contractAddress);
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error retrieving user transaction history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserCarbonCreditBalance = async (req, res, next) => {
  try {
    const balance = await TransactionService.getUserCarbonCreditBalance(req.user.contractAddress);
    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error retrieving user carbon credit balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
