const logger = require('./logger');
exports.pathNotFound = (req, res, next) => {
  logger.error(`Path not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: 'Path not found', 
  });
}