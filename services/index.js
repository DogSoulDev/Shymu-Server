const { config } = require('../config');
const cloudinary = require('./cloudinary');
const logger = require('./logger');


const {
  verifyAuthToken,
  getAuthToken,
  signUp,
  signOut,
  auth,
} = require('./auth');

module.exports = {
  verifyAuthToken,
  getAuthToken,
  signUp,
  signOut,
  auth,
  cloudinary,
  logger,
};
