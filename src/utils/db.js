// db.js
const { Sequelize } = require('sequelize');
// process.env.DB_PASSWORD
//
// Replace with your PostgreSQL credentials

// let sequalize = null

// exports.databaseConn = (db_name,username,password,schema,host,dialact) =>{
//   sequalize = new Sequelize(db_name,username,password, {
//     host: host,
//     dialect:  dialact || 'postgres',
//     define: {
//       schema: schema,
//     }
//   });
//   return sequalize;
// }

// exports.sequalize = sequalize;

const sequelize = new Sequelize('schoolsystem',process.env.DB_USERNAME ,'Shayak@123', {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  define: {
    schema: 'videometa',
  }
});


module.exports = sequelize;
