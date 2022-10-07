const MyRouter = require('express').Router();
const { tracksController } = require('../controllers');

MyRouter.get('/tracks', tracksController.getMyTracks);
MyRouter.get('/tracks/liked', tracksController.getLikedTracks);

module.exports = MyRouter;
