const Router = require('express').Router();
const GenreRouter = Router();

const { genreController } = require('../controllers');
const { errorMiddleware, authMiddleware } = require('../middleware');

GenreRouter.get('/genre', authMiddleware, genreController.getGenres);
GenreRouter.post('/genre', authMiddleware, genreController.createGenre);

module.exports = GenreRouter;
