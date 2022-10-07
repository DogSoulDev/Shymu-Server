const searchRouter = require('express').Router();
const { searchController } = require('../controllers/searchController');

searchRouter.get('/searchTracks', searchController.searchTracks);

module.exports = searchRouter;