// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const bcrypt = require('bcrypt');
const { generateToken , generateRefreshToken} = require('../utils/jwt'); // Assuming you have a JWT utility for token generation
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,   
    primaryKey: true,     
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false   
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  // Model options
  tableName: 'users', // optional
  timestamps: true    // adds createdAt and updatedAt
});

User.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password,Number.parseInt(process.env.BCRYPT_SALT_ROUNDS));
})

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.getToken = function () {
  return generateToken({
    email: this.email,
    id: this.id,
    role: this.role   
  })
}

User.prototype.getRefreshToken = function () {
  return generateRefreshToken({
    email: this.email,
    id: this.id,
    role: this.role   
  })
}



module.exports = User;

