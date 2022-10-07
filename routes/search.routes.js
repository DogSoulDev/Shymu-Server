const Router = require('express').Router();
const SearchRouter = Router();
const { searchController } = require('../controllers');

SearchRouter.get('/', searchController.searchTracks());

module.exports = SearchRouter;
