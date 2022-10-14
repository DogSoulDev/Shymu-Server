const Router = require('express');
const Statistics = Router();
const { playbackController } = require('../controllers');
const { errorMiddleware, authMiddleware } = require('../middleware');


Statistics.get(
  '/tracks/playbacks',
  authMiddleware,
  playbackController.fetchPlaybacks
);

Router.get('/tracks/statistics', authMiddleware, playbackController.fetchStats);

module.exports = {
  Statistics,
};
