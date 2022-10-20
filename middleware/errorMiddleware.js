const { config } = require('../config');

function errorMiddleware(err, req, res, next) {
  config.server.logger.debug('Error Handler Middleware: ');
  config.server.logger.error(err);

  if (req.headersSent) {
    return next(err);
  }
  res.status(500).send({
    message: 'Something went wrong',
  });
}

module.exports = { errorMiddleware: errorMiddleware };