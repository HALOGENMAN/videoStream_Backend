const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const RefreshToken = sequelize.define('RefreshToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  }
},{
  tableName: 'refreshToken',
  timestamps: false 
})



module.exports = RefreshToken;