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
app.use(json({
  limit: '50mb',
}));
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




module.exports = app;



//!Revisar porque no lo pilla asi:
// const {
//   UserRouter,
//   TrackRouter,
//   PlaylistRouter,
//   GenreRouter,
//   GenderRouter,
//   SearchRouter,
// } = require('./routes');



// const TrackRouter = require('./routes/track.routes');
// const PlaylistRouter = require('./routes/playlist.routes');
// const GenreRouter = require('./routes/genre.routes');
// const GenderRouter = require('./routes/gender.routes');
// const SearchRouter = require('./routes/search.routes');



// app.use('/track', errorMiddleware, TrackRouter);
// app.use('/genre', errorMiddleware, GenreRouter);
// app.use('/gender', errorMiddleware, GenderRouter);
// app.use('/playlist', errorMiddleware, PlaylistRouter);
// app.use('/search', errorMiddleware, SearchRouter);

// app.get('/', (req, res) => {
//   res.status(200).send({
//     data: 'The request has succeeded!',
//   });
// });
// app.get('/user', (req, res) => {
//   res.status(200).send({
//     data: 'The USER request has succeeded!',
//   });
// });

module.exports = {
  app
};
