const Router = require('express').Router();
const GenreRouter = Router();
const { authMiddleware } = require('../middleware');
const { genreController } = require('../controllers');

GenreRouter.get('/', authMiddleware, genreController.getGenres);
GenreRouter.post('/', authMiddleware, genreController.createGenre);

module.exports = GenreRouter;
