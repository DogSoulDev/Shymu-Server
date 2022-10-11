const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const { authMiddleware, errorMiddleware } = require('./middleware');
const { config } = require('./config');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

//!Revisar porque no lo pilla asi:
// const {
//   UserRouter,
//   TrackRouter,
//   PlaylistRouter,
//   GenreRouter,
//   SearchRouter,
// } = require('./routes');

const UserRouter = require('./routes/user.routes');
const TrackRouter = require('./routes/track.routes');
const PlaylistRouter = require('./routes/playlist.routes');
const GenreRouter = require('./routes/genre.routes');
const SearchRouter = require('./routes/search.routes');

app.use(morgan('dev'));
app.use(helmet());
app.use(json());

//!Revisar error de cors.
app.use(
  cors({
    origin: '*'
    //*config.development.client.url,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use('/user', errorMiddleware, UserRouter);
app.use('/track', errorMiddleware, TrackRouter);
app.use('/genre', errorMiddleware, GenreRouter);
app.use('/playlist', errorMiddleware, PlaylistRouter);
app.use('/search', errorMiddleware, SearchRouter);

app.get('/', (req, res) => {
  res.status(200).send({
    data: 'The request has succeeded!',
  });
});

module.exports = {
  app: app,
};
