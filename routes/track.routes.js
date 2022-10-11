const Router = require('express').Router;
const TrackRouter = Router();
const { errorMiddleware, authMiddleware } = require('../middleware');
const { multerAudio, multerImage } = require('../utils/multer');
const { trackController } = require('../controllers');

TrackRouter.post(
  '/tracks',
  multerAudio.fields([
    { name: 'track', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  trackController.uploadTrack
);
TrackRouter.patch(
  '/:id',
  authMiddleware,
  multerImage.single('thumbnail'),
  trackController.editTrack
);
TrackRouter.get('/:id', authMiddleware, trackController.getTrack);
TrackRouter.get(
  '/:id/play',
  authMiddleware,
  multerImage.single('thumbnail'),
  trackController.playTrack
);
TrackRouter.put('/:id/like', authMiddleware, trackController.likeTrack);
TrackRouter.delete('/:id', authMiddleware, trackController.deleteTrack);
TrackRouter.get(
  '/filter/:id',
  authMiddleware,
  trackController.getTracksForPlaylist
);

module.exports = TrackRouter;
