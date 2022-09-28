//*Primer paso en verde.
//?Segundo paso en azul.
//!Tercer paso en rojo.

const express = require('express');
const api = express.Router();

const taskController = require('../controllers/taskController');

//*Añadir ruta para crear tareas:
api.post('/tasks', taskController.postTask);
api.get('/tasks', taskController.getTasks);
//*Listar una tarea:
api.get('/tasks/:id', taskController.getTask);
//*Actualizar una tarea:
api.put('/tasks/:id', taskController.putTask);

module.exports = api;
