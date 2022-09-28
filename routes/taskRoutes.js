//*Importa y carga el enrutador de express lo metemos en la constante api y podemos acceder luego a ella.
const express = require('express');
const api = express.Router();

//*Se importa el controlador para cada ruta:
const taskController = require("../controllers/taskController");

//*Se agrega el controlador a una ruta determinada:
api.get("/tasks", taskController.getTasks);

//*Meteremos todas las rutas en este fichero para poder usarlas luego.
module.exports = api;