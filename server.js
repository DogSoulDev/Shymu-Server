const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const { errorMiddleware } = require('./middleware');
const { config } = require('./config');

const {
  UsersRouter,
  TracksRouter,
  PlaylistsRouter,
  GenreRouter,
  // SearchRouter,
} = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.app.url,
  }),
  json({
    limit: '50mb',
  })
);

app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use('/',routes);
// routes.initialize(app);
app.use('/users', UsersRouter);
app.use('/tracks', TracksRouter);
app.use('/genre', GenreRouter);
app.use('/playlist', PlaylistsRouter);
// app.use('/search', SearchRouter);

app.get('/', (req, res) => {
  res.status(200).send({
    data: 'The request has succeeded!',
  });
});

app.use(errorMiddleware);

module.exports = {
  app: app,
};
