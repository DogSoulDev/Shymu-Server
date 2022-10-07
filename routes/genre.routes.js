const Router = require('express').Router;
const GenreRouter = Router();
const { errorMiddleware, authMiddleware } = require("../middleware");
const { genreController } = require('../controllers');

GenreRouter.get('/genre', authMiddleware, genreController.getGenres);
GenreRouter.post('/genre', authMiddleware, genreController.createGenre);

module.exports = GenreRouter;
