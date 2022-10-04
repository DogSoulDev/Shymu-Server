//!Token Functions export.
const { verifyIdToken } = require('./auth-provider');
const { getAuthToken } = require('./get-auth-token');

module.exports = { verifyIdToken: verifyIdToken, getAuthToken: getAuthToken };