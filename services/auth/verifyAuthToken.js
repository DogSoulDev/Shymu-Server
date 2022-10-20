const { verifyIdToken } = require('./authProvider');

function verifyAuthToken(token) {
  return verifyIdToken(token);
}

module.exports = {
  verifyAuthToken,
};
