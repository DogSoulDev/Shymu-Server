const Router = require('express').Router;

const { authMiddleware } = require('../middleware');
const { usersController } = require('../controllers');

const usersRouter = Router();

usersRouter.post('/signUp', authMiddleware, usersController.signUp);
usersRouter.post('/signOut', authMiddleware, usersController.signOut);

module.exports = {
  usersRouter: usersRouter,
};
