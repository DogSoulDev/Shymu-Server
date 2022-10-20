//!Otro testeo distinto:

const Router = require('express').Router();
const UserRouter = Router();

const { userController } = require('../controllers');
const { authMiddleware, errorMiddleware } = require('../middleware');
const { multerImage } = require('../utils/multer');

console.log("errorMiddleware");
console.log("authMiddleware");

UserRouter.post(
  '/signUp',
  authMiddleware,
  errorMiddleware,
  userController.signUp
);
UserRouter.post('/sign-up', authMiddleware, userController.signUp, (req,res,next)=>{
  console.log("testeando esto");
});
UserRouter.get('/sign-out', authMiddleware, userController.signOut);
UserRouter.post(
  '/update-avatar',
  multerImage.single('profilePicture'),
  userController.updateAvatar
);
UserRouter.patch('/update', userController.updateUser);
UserRouter.get('/:id', userController.getUser);
UserRouter.get('/', userController.getAllUsers);
UserRouter.get('/:id/tracks', userController.getUserTracks);
UserRouter.get('/:id/playlist', userController.getUserPlaylist);

module.exports = UserRouter;





