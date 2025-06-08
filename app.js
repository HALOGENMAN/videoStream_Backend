const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const { databaseConn } = require('./src/utils/db');
const { commonHeadders } = require('./src/utils/headders');
const { pathNotFound } = require('./src/utils/pathNotFound');
const { erroHandler } = require('./src/utils/errorHandler');
const logger = require('./src/utils/logger');

const app = express();


//---middlewared---
dotenv.config();
app.use(express.json());
app.use(commonHeadders);

app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);


app.use(pathNotFound);
app.use(erroHandler);

databaseConn(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_SCHEMA,
  process.env.DB_HOST,
  process.env.DB_DIALECT
).authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });