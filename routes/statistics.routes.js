const Router = require('express').Router();
const { errorMiddleware, authMiddleware } = require('../middleware');
const { playbackController } = require('../controllers');

Router.get(
  '/tracks/playbacks',
  authMiddleware,
  paybackController.fetchPlaybacks
);

Router.get('/tracks/', authMiddleware, trackPlaybackController.fetchStats);

module.exports = {
  Router: Router,
};
