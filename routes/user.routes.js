const Router = require('express');
const UserRouter = Router();
const { userController } = require('../controllers');

const { authMiddleware, errorMiddleware } = require('../middleware');
const { multerImage } = require('../utils/multer');

UserRouter.post(
  '/sign-up',
  authMiddleware,
  errorMiddleware,
  userController.signUp
);
UserRouter.get(
  '/sign-out',
  authMiddleware,
  errorMiddleware,
  userController.signOut
);
UserRouter.post(
  '/update-avatar',

  userController.updateAvatar
);
UserRouter.patch(
  '/update',
  authMiddleware,
  errorMiddleware,
  userController.updateUser
);
UserRouter.get('/:id', authMiddleware, errorMiddleware, userController.getUser);
UserRouter.get(
  '/:id/tracks',
  authMiddleware,
  errorMiddleware,
  userController.getUserTracks
);
UserRouter.get(
  '/:id/playlist',
  authMiddleware,
  errorMiddleware,
  userController.getUserPlaylist
);

module.exports = UserRouter;
