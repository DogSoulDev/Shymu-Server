const { Router } = require('express');
const UserRouter = Router();
const { userController } = require('../controllers');
const { authMiddleware, errorMiddleware } = require('../middleware');
const { multerImage } = require('../utils/multer');

console.log('errorMiddleware');
console.log('authMiddleware');

UserRouter.post('/signUp', authMiddleware, userController.signUp);
UserRouter.get('/signOut', authMiddleware, userController.signOut);
UserRouter.post(
  '/updateAvatar',
  multerImage.single('profilePicture'),
  userController.updateAvatar
);
UserRouter.patch('/update', userController.updateUser);

UserRouter.get('/:id', userController.getUser);
UserRouter.get('/', userController.getAllUsers);

UserRouter.get('/:id/tracks', userController.getUserTracks);
UserRouter.get('/:id/playlist', userController.getUserPlaylist);

module.exports = UserRouter;
