// const dotenv = require('dotenv');
// const logger = require('loglevel');

// logger.enableAll();
// dotenv.config();

// const {
//   CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET,
//   CLOUDINARY_NAME,

//   PORT,
//   CLIENT_URL,
//   DB_URL,
// } = process.env;

// const CONFIG = {
//   development: {
//     app: {
//       PORT: PORT || 3001,
//     },
//     client: {
//       URL: CLIENT_URL || 'http://localhost:3000',
//     },
//     logger: {
//       warn: logger.warn,
//       info: logger.info,
//       error: logger.error,
//       trace: logger.trace,
//       debug: logger.debug,
//     },
//     db: {
//       url: DB_URL,
//     },
//     firebase: {
//       type: FB_TYPE,
//       project_id: FB_PROJECT_ID,
//       private_key_id: FB_PRIVATE_KEY_ID,
//       private_key: FB_PRIVATE_KEY,
//       client_email: FB_CLIENT_EMAIL,
//       client_id: FB_CLIENT_ID,
//       auth_uri: FB_AUTH_URI,
//       token_uri: FB_TOKEN_URI,
//       auth_provider_x509_cert_url: FB_AUTH_CERT_URL,
//       client_x509_cert_url: FB_CLIENT_CERT_URL,
//     },
//     cloudinary: {
//       key: CLOUDINARY_API_KEY,
//       secret: CLOUDINARY_API_SECRET,
//       name: CLOUDINARY_NAME,
//     },
//   },
// };

// module.exports = { CONFIG };