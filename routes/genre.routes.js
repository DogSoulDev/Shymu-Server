//*Conectado a express.
const GenreRouter = require('express').Router();

//*Pasa por el Middleware
const { authMiddleware } = require('../middleware');

//*Enruta el Controller.
const { genreController } = require('../controllers');

GenreRouter.get('/', genreController.getGenres);
GenreRouter.post('/', genreController.createGenre);

module.exports = GenreRouter;
