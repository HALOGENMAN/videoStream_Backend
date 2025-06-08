const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const sequelize = require('./src/utils/db');
const { commonHeadders } = require('./src/middleware/headers');
const { pathNotFound } = require('./src/middleware/pathNotFound');

const app = express();


//---middlewared---
dotenv.config();
app.use(bodyParser.json());
app.use(commonHeadders());


app.use(pathNotFound);


sequelize.sync()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });