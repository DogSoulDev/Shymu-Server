const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const { authMiddleware } = require('./middleware');
const { config } = require('./config');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// const {
//   UsersRouter,
//   TracksRouter,
//   PlaylistsRouter,
//   GenreRouter,
//   SearchRouter,
// } = require('./routes');
const usersRouter = require('./routes/users.routes');
const tracksRouter = require('./routes/tracks.routes');
const playlistsRouter = require('./routes/playlists.routes');
const genreRouter = require('./routes/genre.routes');

app.use(morgan('dev'));
app.use(helmet());
app.use(json());
// app.use(
//   cors({
//     origin: config.development.client.url,
//   }),
//   json({
//     limit: '50mb',
//   })
// );
app.use(usersRouter);
app.use(tracksRouter);
app.use(playlistsRouter);
app.use(genreRouter);
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(UsersRouter, authMiddleware);
// app.use('/tracks', errorMiddleware, TracksRouter);
// app.use('/genre', errorMiddleware, GenreRouter);
// app.use('/playlists', errorMiddleware, PlaylistsRouter);
// app.use('/search', errorMiddleware, SearchRouter);

app.get('/', (req, res) => {
  res.status(200).send({
    data: 'The request has succeeded!',
  });
});

module.exports = {
  app: app,
};
