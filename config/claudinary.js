// //!Cloudinary para gestionar imagenes desde www.cloudinary.com
const cloudinary = require('cloudinary');
const dotenv = require("dotenv"); //*Para poder evitar subir passwords al github hay que usar el dotenv de la siguiente manera:
dotenv.config();


/* Exporting the cloudinary module. */
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret:  process.env.CLOUD_KEY_SECRET
});

module.exports = cloudinary;