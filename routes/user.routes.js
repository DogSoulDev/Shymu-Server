const Router = require('express').Router;
const UserRouter = Router();
const { userController } = require('../controllers');
const { authMiddleware } = require('../middleware');
const { multerImage } = require('../utils/multer');

UserRouter.post('/sign-up', authMiddleware, userController.signUp);
UserRouter.get('/sign-out', authMiddleware, userController.signOut);
UserRouter.post(
  '/update-avatar',
  multerImage.single('profilePicture'),
  userController.updateAvatar
);
UserRouter.patch('/update', authMiddleware, userController.updateUser);
UserRouter.get('/:id', authMiddleware, userController.getUser);
UserRouter.get('/:id/tracks', authMiddleware, userController.getUserTracks);
UserRouter.get('/:id/playlist', authMiddleware, userController.getUserPlaylist);

module.exports = UserRouter;
