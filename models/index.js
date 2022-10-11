const mongoose = require('mongoose');
const UserModel = require('./userModel');
const TrackModel = require('./trackModel');
const PlaylistModel = require('./playlistModel');
const PlaybackModel = require('./playbackModel');
const GenreModel = require('./genreModel');
const GenderModel = require('./genderModel');
const DefaultModel = require('./defaultModel');

module.exports = {
  UserModel,
  TrackModel,
  PlaylistModel,
  PlaybackModel,
  GenreModel,
  GenderModel,
  DefaultModel,
};
