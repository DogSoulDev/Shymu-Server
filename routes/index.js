const { UsersRouter } = require('./users.routes');
const { TracksRouter } = require('./tracks.routes');
const { PlaylistsRouter } = require('./playlists.routes');
const { GenreRouter } = require('./genre.routes');
const { StatsRouter } = require('./statistics.routes');
const { SearchRouter } = require('./search.routes');
const { GenderRouter } = require('./gender.routes');
const { AlbumRouter } = require('./album.routes');

module.exports = {
  UsersRouter,
  TracksRouter,
  PlaylistsRouter,
  GenreRouter,
  GenderRouter,
  StatsRouter,
  SearchRouter,
  AlbumRouter,
};