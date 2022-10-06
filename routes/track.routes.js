// //*Conecto express
// const TrackRouter = require('express').Router();

// //!Revisar Middleware
// const { authMiddleware } = require('../middleware');

// //!Revisar el utils
// const { multerAudio, multerImage } = require('../utils/multer');

// //*Imprto Controller
// const { trackController } = require('../controllers');

// TrackRouter.post(
//   '/',

//   multerAudio.fields([
//     { name: 'track', maxCount: 1 },
//     { name: 'cover', maxCount: 1 },
//   ]),
//   trackController.uploadTrack
// );
// TrackRouter.patch(
//   '/:id',
//   multerImage.single('cover'),
//   trackController.editTrack
// );

// TrackRouter.get('/:id', trackController.getTrack);

// TrackRouter.get(
//   '/:id/play',
//   multerImage.single('cover'),
//   trackController.playTrack
// );

// TrackRouter.put('/:id/like', trackController.likeTrack);

// TrackRouter.delete('/:id', trackController.deleteTrack);

// TrackRouter.get('/filter/:id', trackController.getTracksForPlaylist);

// module.exports = TrackRouter;
