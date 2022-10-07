const { logger } = require('../services/logger');

function errorMiddleware(err, req, res, next) {
  logger.debug('Error detected try again later! ');
  logger.error(err);

  if (req.headersSent) {
    return next(err);
  }

  res.status(500).send({
    message: 'Error, please try again later!',
  });
}

module.exports = { errorMiddleware };
