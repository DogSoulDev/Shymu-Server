const helmet = require('helmet');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const { authMiddleware, errorMiddleware } = require('./middleware');
const { config } = require('./config');
const express = require('express');
const app = express();

app.use(express.json());
app.use(morgan('DEV'));
app.use(helmet());
app.use(
  json({
    limit: '50mb',
  })
);
app.use(
  cors({
    origin: config.server.client.CLIENT_URL,
    methods: ['GET', 'PUT', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ limit: '10mb', extended: true }));

const {
  UserRouter,
  TrackRouter,
  GenreRouter,
  GenderRouter,
  PlaylistRouter,
} = require('./routes');

app.use(errorMiddleware);
app.use('/user', UserRouter);
app.use('/tracks', TrackRouter);
app.use('/genre', GenreRouter);
app.use('/gender', GenderRouter);
app.use('/playlist', PlaylistRouter);

module.exports = {
  app,
};
