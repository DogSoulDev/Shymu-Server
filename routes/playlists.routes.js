const PlaylistsRouter = require('express').Router();
const { multerAudio, multerImage } = require('../utils/multer');
const { authMiddleware } = require('../middleware');
const { playlistController } = require('../controllers');

PlaylistsRouter.post(
  '/createPlaylist',
  multerImage.single('thumbnail'),
  playlistController.createPlaylist
);

PlaylistsRouter.get('/fetchPlaylists', playlistController.getAllPlaylists);
PlaylistsRouter.get('/public', playlistController.getPublicPlaylists);
PlaylistsRouter.patch('/:id', playlistController.addTrack);
PlaylistsRouter.get('/fetchPlaylistById', playlistController.getPlaylistById);
PlaylistsRouter.put('/:id/follow', playlistController.followPlaylist);
PlaylistsRouter.patch(
  '/update/:id',
  multerImage.single('thumbnail'),
  playlistController.updatePlaylist
);
PlaylistsRouter.delete('/:id', playlistController.deletePlaylist);
PlaylistsRouter.put('/order/:id', playlistController.orderTracks);

module.exports = PlaylistsRouter;
