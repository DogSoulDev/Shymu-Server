const usersController = require('./usersController');
const tracksController = require('./tracksController');
const playlistsController = require('./playlistsController');
const genreController = require('./genreController');
const searchController = require('./searchController');

module.exports = {
  usersController: usersController,
  tracksController: tracksController,
  playlistsController: playlistsController,
  genreController: genreController,
  searchTracks: searchController,
};
