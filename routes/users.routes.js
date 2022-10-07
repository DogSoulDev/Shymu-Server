const Router = require('express').Router;
const UsersRouter = Router();
const { usersController } = require('../controllers');
const { authMiddleware } = require('../middleware');
const { multerImage } = require('../utils/multer');

UsersRouter.post('/sign-up', authMiddleware, usersController.signUp);
UsersRouter.get('/sign-out', authMiddleware, usersController.signOut);
UsersRouter.post(
  '/update-avatar',
  multerImage.single('profilePicture'),
  usersController.updateAvatar
);
UsersRouter.patch('/update', usersController.updateUser);
UsersRouter.get('/:id', usersController.getUser);
UsersRouter.get('/', usersController.getAllUsers);
UsersRouter.get('/:id/tracks', usersController.getUserTracks);
UsersRouter.get('/:id/playlist', usersController.getUserPlaylist);

module.exports = UsersRouter;
