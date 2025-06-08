const  { logger } = require('./logger');
exports.erroHandler = (err, req, res, next) => {
  // console.error(err.stack);
  logger.error(`Error occurred: ${err.message} + ${req.method} + ${req.originalUrl}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: err.message,
  });
}