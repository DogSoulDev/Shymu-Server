const { config } = require('../config');

const {
  verifyAuthToken,
  getAuthToken,
  signUp,
  signOut,
  auth,
} = require('./auth');

const cloudinary = require('./cloudinary');
const logger = require('./logger');

module.exports = {
  verifyAuthToken,
  getAuthToken,
  signUp,
  signOut,
  auth,
  cloudinary,
  logger,
};
