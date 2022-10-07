const { logger } = require('../services/logger');

function errorMiddleware(err, req, res, next) {
  logger.debug('Error detected with Middleware! ');
  logger.error(err);

  if (req.headersSent) {
    return next(err);
  }

  res.status(500).send({
    message: 'Try again later!',
  });
}

module.exports = { errorMiddleware: errorMiddleware };
