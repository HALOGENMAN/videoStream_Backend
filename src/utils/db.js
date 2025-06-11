// db.js
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('schoolsystem',process.env.DB_USERNAME ,'Shayak@123', {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  define: {
    schema: 'videometa',
  }
});


module.exports = sequelize;
