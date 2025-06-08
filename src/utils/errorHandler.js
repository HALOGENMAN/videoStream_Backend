const  logger = require('./logger');
exports.erroHandler = (err, req, res, next) => {
  logger.error(`Error occurred: ${err.message} + ${req.method} + ${req.originalUrl}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: err.message,
  });
}