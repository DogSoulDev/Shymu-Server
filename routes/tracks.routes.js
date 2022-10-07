const TracksRouter = require('express').Router();
const { authMiddleware } = require('../middleware');
const { tracksController } = require('../controllers');
const { multerAudio, multerImage } = require('../utils/multer');

TracksRouter.post(
  '/',
  authMiddleware,
  multerAudio.fields([
    { name: 'track', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  tracksController.uploadTrack
);
TracksRouter.patch(
  '/:id',
  authMiddleware,
  multerImage.single('thumbnail'),
  tracksController.editTrack
);
TracksRouter.get('/:id', authMiddleware, tracksController.getTrack);
TracksRouter.get(
  '/:id/play',
  authMiddleware,
  multerImage.single('thumbnail'),
  tracksController.playTrack
);
TracksRouter.put('/:id/like', authMiddleware, tracksController.likeTrack);
TracksRouter.delete('/:id', authMiddleware, tracksController.deleteTrack);
TracksRouter.get(
  '/filter/:id',
  authMiddleware,
  tracksController.getTracksForPlaylist
);

module.exports = TracksRouter;
