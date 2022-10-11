const Router = require('express').Router;
const SearchRouter = Router();
const { errorMiddleware, authMiddleware } = require('../middleware');
const { searchController } = require('../controllers');

SearchRouter.get('/', authMiddleware, searchController.searchTrack());

module.exports = SearchRouter;
