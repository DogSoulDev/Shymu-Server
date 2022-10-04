//!Todos los Controllers en un mismo archivo.
const userController = require('./userController');
const trackController = require('./trackController');
const genreController = require('./genreController');
const playlistController = require('./playlistController');
const searchController = require('./searchController');

module.exports = {
  userController,
  trackController,
  genreController,
  playlistController,
  searchController,
};
