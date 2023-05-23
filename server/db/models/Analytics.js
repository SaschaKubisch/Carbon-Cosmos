const { DataTypes } = require('sequelize');
const db = require('../db');

const User = require('./User');

const Analytics = db.define('Analytics', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    visits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    uniqueVisitors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    avgTimeOnSite: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

Analytics.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasOne(Analytics, {
    foreignKey: 'userId',
    as: 'analytics',
});

module.exports = Analytics;
