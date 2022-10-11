const Router = require('express').Router;
const PlaylistsRouter = Router();
const { multerAudio, multerImage } = require('../utils/multer');
const { errorMiddleware, authMiddleware } = require('../middleware');
const { playlistsController } = require('../controllers');

PlaylistsRouter.post(
  '/playlist',
  multerImage.single('thumbnail'),
  playlistsController.createPlaylist
);
PlaylistsRouter.get('/playlists', authMiddleware, playlistsController.getAllPlaylists);
PlaylistsRouter.get(
  '/public',
  authMiddleware,
  playlistsController.getPublicPlaylists
);
PlaylistsRouter.patch('/:id', authMiddleware, playlistsController.addTrack);
PlaylistsRouter.get(
  '/:id',
  authMiddleware,
  playlistsController.getPlaylistById
);
PlaylistsRouter.put(
  '/:id/follow',
  authMiddleware,
  playlistsController.followPlaylist
);
PlaylistsRouter.patch(
  '/update/:id',
  authMiddleware,
  multerImage.single('thumbnail'),
  playlistsController.updatePlaylist
);
PlaylistsRouter.delete(
  '/:id',
  authMiddleware,
  playlistsController.deletePlaylist
);
PlaylistsRouter.put(
  '/order/:id',
  authMiddleware,
  playlistsController.orderTracks
);

module.exports = PlaylistsRouter;
