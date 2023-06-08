const { DataTypes } = require('sequelize');
const db = require('../db');

const Transaction = db.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  receiverAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  offsetType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Transaction;
