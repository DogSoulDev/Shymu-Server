const { config } = require('../../config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.server.cloudinary.name,
  api_key: config.server.cloudinary.key,
  api_secret: config.server.cloudinary.secret,
  secure: true,
});

module.exports = { cloudinary };

// //*https://cloudinary.com/documentation/node_integration
