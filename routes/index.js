const { UsersRouter } = require('./users.routes');
const { TracksRouter } = require('./tracks.routes');
const { PlaylistsRouter } = require('./playlists.routes');
const { GenreRouter } = require('./genre.routes');
const { MyRouter } = require('/');

module.exports = {
  UsersRouter,
  TracksRouter,
  PlaylistsRouter,
  GenreRouter,
  MyRouter,
};
