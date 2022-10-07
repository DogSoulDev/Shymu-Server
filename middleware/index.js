const { authMiddleware } = require('./authMiddleware');
const { errorMiddleware } = require('./errorMiddleware');

module.exports = {
  authMiddleware,
  errorMiddleware,
};
