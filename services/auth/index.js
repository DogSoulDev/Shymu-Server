const { verifyAuthToken } = require('./verifyAuthToken');
const { getAuthToken } = require('./getAuthToken');
const { signUp } = require('./signUp');
const { signOut } = require('./signOut');

module.exports = {
  verifyAuthToken: verifyAuthToken,
  getAuthToken: getAuthToken,
  signUp: signUp,
  signOut: signOut,
};