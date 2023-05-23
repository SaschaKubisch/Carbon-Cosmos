const { DataTypes } = require('sequelize');
const db = require('../db'); // assuming your Sequelize instance is in a file called 'db.js'

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = User;
