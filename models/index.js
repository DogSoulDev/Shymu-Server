const UserModel = require('./userModel');
const TrackModel = require('./trackModel');
const PlaylistModel = require('./playlistModel');

module.exports = {
  User: UserModel,
  Track: TrackModel,
  Playlist: PlaylistModel,
};