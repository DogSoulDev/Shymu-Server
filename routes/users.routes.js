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
UsersRouter.patch('/update', authMiddleware, usersController.updateUser);
UsersRouter.get('/:id', authMiddleware, usersController.getUser);
UsersRouter.get('/:id/tracks', authMiddleware, usersController.getUserTracks);
UsersRouter.get(
  '/:id/playlist',
  authMiddleware,
  usersController.getUserPlaylist
);

module.exports = UsersRouter;
