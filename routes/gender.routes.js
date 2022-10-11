const Router = require('express').Router;
const GenderRouter = Router();
const { errorMiddleware, authMiddleware } = require('../middleware');
const { genderController } = require('../controllers');

GenderRouter.get('/gendre', authMiddleware, genderController.getGenders);
GenderRouter.post('/gendre', authMiddleware, genderController.createGender);

module.exports = GenderRouter;
