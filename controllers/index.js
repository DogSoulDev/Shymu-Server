const userController = require('./userController');
const trackController = require('./trackController');
const playlistController = require('./playlistController');
const genreController = require('./genreController');
const genderController = require('./genderController');
const searchController = require('./searchController');
const playbackController = require('./playbackController');
const { config } = require('../config');

module.exports = {
  userController,
  trackController,
  playlistController,
  playbackController,
  genreController,
  genderController,
  searchController,
};
