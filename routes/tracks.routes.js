const Router = require('express').Router;

const { authMiddleware } = require('../middlewares');
const { tracksController } = require('../controllers');

const tracksRouter = Router();

tracksRouter.post('/createTrack', authMiddleware, tracksController.createTrack);
tracksRouter.get('/fetchTracks', authMiddleware, tracksController.fetchTracks);
tracksRouter.get('/fetchTrackById', authMiddleware, tracksController.fetchTrackById);

module.exports = {
  tracksRouter: tracksRouter,
};
