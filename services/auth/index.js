const { verifyAuthToken } = require('./verifyAuthToken');
const { getAuthToken } = require('./getAuthToken');
const { login } = require('./login');
const { signOut } = require('./signOut');

module.exports = {
  verifyAuthToken: verifyAuthToken,
  getAuthToken: getAuthToken,
  login: login,
  signOut: signOut,
};