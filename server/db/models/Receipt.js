const { DataTypes } = require('sequelize');
const db = require('../db');

const Receipt = db.define('Receipt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Transaction',
      key: 'id'
    }
  }
});

module.exports = Receipt;
