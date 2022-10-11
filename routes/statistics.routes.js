const Router = require('express').Router();
const { errorMiddleware, authMiddleware } = require('../middleware');
const { playbackController } = require('../controllers');

Router.get(
  '/tracks/playbacks',
  authMiddleware,
  playbackController.fetchPlaybacks
);

Router.get('/tracks/statistics', authMiddleware, playbackController.fetchStats);

module.exports = {
  Router: Router,
};
