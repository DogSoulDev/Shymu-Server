const { verifyAuthToken } = require('./verifyAuthToken');
const { getAuthToken } = require('./getAuthToken');
const { signUp } = require('./signUp');
const { signOut } = require('./signOut');
const auth = require('./authProvider');

module.exports = {
  verifyAuthToken,
  getAuthToken,
  signUp,
  signOut,
  auth,
};
