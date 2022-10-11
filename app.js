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

//!Revisar porque no lo pilla asi:
// const {
//   UsersRouter,
//   TracksRouter,
//   PlaylistsRouter,
//   GenreRouter,
//   SearchRouter,
// } = require('./routes');

const userRouter = require('./routes/user.routes');
const trackRouter = require('./routes/track.routes');
const playlistRouter = require('./routes/playlist.routes');
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
app.use(userRouter);
app.use(trackRouter);
app.use(playlistRouter);
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
