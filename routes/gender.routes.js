const Router = require('express');
const GenderRouter = Router();
const { genderController } = require('../controllers');

const { errorMiddleware, authMiddleware } = require('../middleware');

GenderRouter.get('/gendre', authMiddleware, genderController.getGenders);
GenderRouter.post('/gendre', authMiddleware, genderController.createGender);

module.exports = GenderRouter;
