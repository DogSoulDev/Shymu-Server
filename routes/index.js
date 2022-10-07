const { UsersRouter } = require('./users.routes');
const { TracksRouter } = require('./tracks.routes');
const { PlaylistsRouter } = require('./playlists.routes');
const { GenreRouter } = require('./genre.routes');
// const { SearchRouter } = require('./search.routes');

module.exports = {
  UsersRouter,
  TracksRouter,
  PlaylistsRouter,
  GenreRouter,
  // SearchRouter,
};
