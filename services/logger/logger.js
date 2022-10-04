const logger = require('logger').createLogger();

logger.enableAll();

module.exports = {
  warn: logger.warn,
  info: logger.info,
  error: logger.error,
  trace: logger.trace,
  debug: logger.debug,
};

//*https://github.com/quirkey/node-logger