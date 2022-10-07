const GenreRouter = require('express').Router();
const { authMiddleware } = require('../middleware');
const { genreController } = require('../controllers');

GenreRouter.get('/', genreController.getGenres);
GenreRouter.post('/', genreController.createGenre);

module.exports = GenreRouter;
