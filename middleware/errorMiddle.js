const { logger } = require('../services/logger/logger');

function errorMiddleware(err, req, res, next) {
  logger.debug('Error ');
  logger.error(err);

  if (req.headersSent) {
    return next(err);
  }

  res.status(500).send({
    message: 'Something is wrong!',
  });
}

module.exports = { errorMiddleware: errorMiddleware };
