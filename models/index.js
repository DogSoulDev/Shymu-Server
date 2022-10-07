const UserModel = require('./userModel');
const TrackModel = require('./trackModel');
const PlaylistModel = require('./playlistModel');
const PlaybackModel = require('./playbackModel');
const GenreModel = require('./genreModel');
const DefaultModel = require('./defaultModel');

module.exports = {
  Users: UserModel,
  Tracks: TrackModel,
  Playlists: PlaylistModel,
  Playback: PlaybackModel,
  Genre: GenreModel,
  DefaultReq: DefaultModel,
};
