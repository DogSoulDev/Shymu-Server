const Router = require('express');
const TrackRouter = Router();
const { trackController } = require('../controllers');

const { errorMiddleware, authMiddleware } = require('../middleware');
const { multerAudio, multerImage } = require('../utils/multer');

TrackRouter.post(
  '/tracks',
  trackController.uploadTrack
);
TrackRouter.patch(
  '/:id',
  authMiddleware,
  trackController.editTrack
);
TrackRouter.get('/:id', authMiddleware, trackController.getTrack);
TrackRouter.get(
  '/:id/play',
  authMiddleware,
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
