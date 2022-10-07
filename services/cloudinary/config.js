const { config } = require('../../config/databaseConfig');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: config.development.cloudinary.name,
  api_key: config.development.cloudinary.key,
  api_secret: config.development.cloudinary.secret,
  secure: true,
});

module.exports = { cloudinary };

// //*https://cloudinary.com/documentation/node_integration
