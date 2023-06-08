const { DataTypes } = require('sequelize');
const db = require('../db');

const CarbonCredit = db.define('CarbonCredit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  carbonCreditID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  carbonCreditName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carbonCreditDescription: {
    type: DataTypes.STRING
  },
  wrappedTokenAddress: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = CarbonCredit;
