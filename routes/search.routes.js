//*Conectado a Express
const searchRouter = require('express').Router();

//*Importo el Controller
const { searchController } = require('../controllers');

searchRouter.get('/', searchController.searchTracks);

module.exports = searchRouter;
