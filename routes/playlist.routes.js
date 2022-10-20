const { Router } = require('express');
const PlaylistRouter = Router();
const { playlistController } = require('../controllers');
const { errorMiddleware, authMiddleware } = require('../middleware');

PlaylistRouter.post('/playlist', playlistController.createPlaylist);
PlaylistRouter.get(
  '/playlists',
  authMiddleware,
  playlistController.getAllPlaylists
);
PlaylistRouter.get(
  '/public',
  authMiddleware,
  playlistController.getPublicPlaylists
);
PlaylistRouter.patch('/:id', authMiddleware, playlistController.addTrack);
PlaylistRouter.get('/:id', authMiddleware, playlistController.getPlaylistById);
PlaylistRouter.put(
  '/:id/follow',
  authMiddleware,
  playlistController.followPlaylist
);
PlaylistRouter.patch(
  '/update/:id',
  authMiddleware,
  playlistController.updatePlaylist
);
PlaylistRouter.delete(
  '/:id',
  authMiddleware,
  playlistController.deletePlaylist
);
PlaylistRouter.put(
  '/order/:id',
  authMiddleware,
  playlistController.orderTracks
);

module.exports = PlaylistRouter;
