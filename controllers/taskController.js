//*Primer paso en verde.
//?Puntos a tener en cuenta.
//!Importante.

//!Cargar el modelo de tasks:
const Task = require('../models/taskModel');

//!postTask
//*Nueva función asíncrona para crear tareas:
async function postTask(req, res) {
  //*se crea una objeto del modelo:
  const task = new Task();
  //*recuperar los parámetros del body:
  const params = req.body;
  //*recuperar los datos del body y añadirlos al modelo:
  task.name = params.name;
  task.description = params.description;
  //*Guardar datos:
  try {
    //*Guardar resultados en la base de datos:
    const taskStore = await task.save(); // el proceso será lineal hasta llegar al await (evita ejecutar todo a la vez)
    //*Revisar si no se ha guardado la tarea:
    if (!taskStore) {
      res.status(400).send({ msg: 'Error: Cannot store task!' });
    } else {
      res.status(201).send({ task: taskStore });
    }
  } catch (error) {
    //*Devolver error 500 si sale mal:
    res.status(500).send(error);
  }
}

//*....................................................................
//*....................................................................
//*....................................................................
//*....................................................................

//!getTasks
async function getTasks(req, res) {
  try {
    //*Recuperar tareas de base de datos:
    const tasks = await Task.find().sort({ create_at: -1 }); //*Opcional: ordenar resultados con sort por un parámetro seleccionado.
    //*Agregar condición dentro de find: const tasks = await Task.find({completed: false}).sort({create_at: -1});

    //*Comprobar si hay tareas:
    if (!tasks) {
      res.status(400).send({ msg: 'Error: Cannot get tasks!' });
    } else {
      res.status(200).send(tasks);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//*....................................................................
//*....................................................................
//*....................................................................
//*....................................................................

//!getTask
//*Recuperar una sola tarea:
async function getTask(req, res) {
  //*Recuperar el id:
  const taskId = req.params.id;

  try {
    //*Se hace un findById con el id recibido por request:
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(400).send({ msg: "Error: Task doesn't exist!" });
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//*....................................................................
//*....................................................................
//*....................................................................
//*....................................................................

//!putTask
//*Crear la función (no asincrona) para actualizar tareas:
function putTask(req, res) {
  //*Recuperar el id:
  const taskId = req.params.id;
  //*Recuperar parametros a actualizar:
  const params = req.body;

  try {
    //*Recuperar la tarea y ejecutar un callback:
    Task.findById(taskId, (err, taskData) => {
      //*Comprobar si hay errores al recuperar tarea:
      if (err) {
        res.status(500).send({ msg: 'Server status error' }); //?(Error 500) -The HyperText Transfer Protocol (HTTP) 500 Internal Server Error server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
      } else {
        if (!taskData) {
          res.status(400).send({ msg: "Error: Task doesn't exists" }); //?(Error 400) -The HyperText Transfer Protocol (HTTP) 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).
        } else {
          //*Recuperar parametros a modificar:
          taskData.name = params.name;
          taskData.description = params.description;

          //*Si todo va bien, actualizar tarea y ejecutar un callback:
          Task.findByIdAndUpdate(taskId, taskData, (err, result) => {
            if (err) {
              res.status(404).send({ msg: err });
            } else if (!result) {
              res.status(404).send({ msg: "Error: task doesn't exists" });
            } else {
              res.status(201).send({ task: taskData });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  postTask,
  getTasks,
  getTask,
  putTask,
};
