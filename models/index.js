const mongoose = require('mongoose');
const UsersModel = require('./usersModel');
const TracksModel = require('./tracksModel');
const PlaylistsModel = require('./playlistsModel');
const PlaybackModel = require('./playbackModel');
const GenreModel = require('./genreModel');
const DefaultModel = require('./defaultModel');

module.exports = {
  UsersModel,
  TracksModel,
  PlaylistsModel,
  PlaybackModel,
  GenreModel,
  DefaultModel,
};
