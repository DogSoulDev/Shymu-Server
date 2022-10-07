const searchRouter = require('express').Router();
const { searchController } = require('../controllers');

searchRouter.get('/', searchController.searchTracks);

module.exports = searchRouter;
