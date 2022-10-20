const Router = require('express').Router();
const PlaylistRouter = Router();

const { playlistsController } = require('../controllers');
const { errorMiddleware, authMiddleware } = require('../middleware');

PlaylistRouter.post('/playlist', playlistsController.createPlaylist);
PlaylistRouter.get(
  '/playlists',
  authMiddleware,
  playlistsController.getAllPlaylists
);
PlaylistRouter.get(
  '/public',
  authMiddleware,
  playlistsController.getPublicPlaylists
);
PlaylistRouter.patch('/:id', authMiddleware, playlistsController.addTrack);
PlaylistRouter.get('/:id', authMiddleware, playlistsController.getPlaylistById);
PlaylistRouter.put(
  '/:id/follow',
  authMiddleware,
  playlistsController.followPlaylist
);
PlaylistRouter.patch(
  '/update/:id',
  authMiddleware,
  playlistsController.updatePlaylist
);
PlaylistRouter.delete(
  '/:id',
  authMiddleware,
  playlistsController.deletePlaylist
);
PlaylistRouter.put(
  '/order/:id',
  authMiddleware,
  playlistsController.orderTracks
);

module.exports = PlaylistRouter;
