const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const { config } = require("./config/databaseConfig");
const { errorMiddleware } = require("./middleware/errorMiddleware");

const {
  usersRouter,
  tracksRouter,
  playlistsRouter,
  genreRouter,
  searchRouter,
} = require("./routes");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.url,
  }),
  json({
    limit: '50mb',
  })
);
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(usersRouter);
app.use(tracksRouter);
app.use(playlistsRouter);
app.use(genreRouter);
app.use(searchRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "The request has succeeded!",
  });
});

app.use(errorMiddleware);
app.use('/users', usersRouter);
app.use('/tracks', tracksRouter);
app.use('/genre', genreRouter);
app.use('/my', myRouter);
app.use('/playlist', playlistsRouter);
app.use('/search', searchRouter);

module.exports = {
  app: app,
};