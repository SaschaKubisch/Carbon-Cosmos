const { Sequelize } = require('sequelize');
const UserModel = require('../models/User');
const TransactionModel = require('../models/Transaction');
const CarbonCreditModel = require('../models/CarbonCredit');
const ReceiptModel = require('../models/Receipt');

// Define the database connection
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // Adjust the dialect based on your database type
});

// Define the models
const User = UserModel(sequelize);
const Transaction = TransactionModel(sequelize);
const CarbonCredit = CarbonCreditModel(sequelize);
const Receipt = ReceiptModel(sequelize);

// Define model associations
User.hasMany(Transaction);
Transaction.belongsTo(User);

// Export the models and sequelize instance
module.exports = {
  sequelize,
  User,
  Transaction,
  CarbonCredit,
  Receipt,
};
