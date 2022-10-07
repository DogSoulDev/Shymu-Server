const { usersRouter } = require("./user-routes");
const { tracksRouter } = require("./track-routes");
const { playlistsRouter } = require("./playlist-route");
const { genreRouter } = require("./genre-routes");

module.exports = {
  userRouter: usersRouter,
  trackRouter: tracksRouter,
  playlistRouter: playlistsRouter,
  genreRouter: genreRouter,
};