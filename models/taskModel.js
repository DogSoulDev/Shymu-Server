//*Primer paso en verde.
//?Puntos a tener en cuenta.
//!Importante.

//*Se importa mongoose para mongodb y se inicializa el modulo schema para hacer un modelo:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//*Se crea un schema del modelo:
const TaskSchema = Schema({
  //* todos los campos van a ser requeridos (require: true)
  name: {
    // se crea un título de tipo cadena
    type: String,
    require: true,
  },
  description: {
    // del mismo modo se crea la descripción
    type: String,
    require: true,
  },
  is_complete: {
    // se crea un campo para verificar si se ha completado
    type: Boolean,
    require: true,
    default: false, // por defecto se asignará el valor false
  },
  date_created: {
    // se crea un campo para la fecha de creación
    type: Date,
    require: true,
    default: Date.now, // por defecto llevará la fecha de creación en el momento
  },
  date_finish: {
    // este campo define la fecha de finalización
    type: Date,
    require: true,
    default: null, // por defecto irá en nulo.
  },
});

//*Se exporta el modelo añadiendo el nombre de la colección de MongoDB y el Schema:
module.exports = mongoose.model('tasks', TaskSchema);

// const mongoose = require("mongoose");
// const Schema = new mongoose.Schema;

// //*Creo el Schema de los usuarios que tengo en mi base de datos de mongodb compass, en este caso dentro de ShymuDB tengo users.
// // new mongoose.Schema
// const UserSchema = Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	email: {
// 		type: String,
// 		required: false,
// 	},
// 	username: {
// 		type: String,
// 		required: false,
// 	},
// 	password: {
// 		type: String,
// 		required: false,
// 	},
// 	is_complete: { // se crea un campo para verificar si se ha completado
//         type: Boolean,
//         require: true,
//         default: false // por defecto se asignará el valor false
//     },
//     date_created: { // se crea un campo para la fecha de creación
//         type: Date,
//         require: true,
//         default: Date.now // por defecto llevará la fecha de creación en el momento
//     },
//     date_finish: { // este campo define la fecha de finalización
//         type: Date,
//         require: true,
//         default: null // por defecto irá en nulo.
//     }
// });

// //*Aqui ponemos el nombre de nuestra base de datos o tabla especifica que tenemos dentro de ShymuDB en este caso "users" y luego el Schema que acabamos de crear.
// const UserModel = mongoose.model("users", UserSchema);

// //*Lo exportamos para tener acceso a este modelo fuera de este archivo.
// module.exports = UserModel;
