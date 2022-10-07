const Router = require('express').Router();
const TracksRouter = Router();
const { authMiddleware } = require('../middleware');
const { multerAudio, multerImage } = require('../utils/multer');
const { tracksController } = require('../controllers');

TracksRouter.post(
  '/',
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
