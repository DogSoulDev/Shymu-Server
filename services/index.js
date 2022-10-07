const logger = require('./logger/logger');
const auth = require('./auth/index');
const { cloudinary } = require('./cloudinary/cloudinary');

module.exports = {
  logger: logger,
  auth: auth,
  cloudinary,
};