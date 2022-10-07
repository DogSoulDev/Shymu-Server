const PlaylistsRouter = require('express').Router();
const { multerAudio, multerImage } = require('../utils/multer');
const { authMiddleware } = require('../middleware');
const { playlistsController } = require('../controllers');

PlaylistsRouter.post(
  '/',
  multerImage.single('thumbnail'),
  playlistsController.createPlaylist
);
PlaylistsRouter.get('/', playlistsController.getAllPlaylists);
PlaylistsRouter.get('/public', playlistsController.getPublicPlaylists);
PlaylistsRouter.patch('/:id', playlistsController.addTrack);
PlaylistsRouter.get('/:id', playlistsController.getPlaylistById);
PlaylistsRouter.put('/:id/follow', playlistsController.followPlaylist);
PlaylistsRouter.patch(
  '/update/:id',
  multerImage.single('thumbnail'),
  playlistsController.updatePlaylist
);
PlaylistsRouter.delete('/:id', playlistsController.deletePlaylist);
PlaylistsRouter.put('/order/:id', playlistsController.orderTracks);

module.exports = PlaylistsRouter;
