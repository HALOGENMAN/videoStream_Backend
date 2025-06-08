// db.js
const { Sequelize } = require('sequelize');

// Replace with your PostgreSQL credentials
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME ,process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  define: {
    schema: process.env.DB_SCHEMA,
  }
});


module.exports = sequelize;
