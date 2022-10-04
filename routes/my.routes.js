const MyRouter = require('express').Router();

const { trackController } = require('../controllers');

MyRouter.get('/tracks', trackController.getMyTracks);

MyRouter.get('/tracks/liked', trackController.getLikedMyTracks);

module.exports = MyRouter;