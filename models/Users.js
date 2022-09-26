const mongoose = require("mongoose");

//!Creo el Schema de los usuarios que tengo en mi base de datos de mongodb compass, en este caso dentro de ShymuDB tengo users.
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

//!Aqui ponemos el nombre de nuestra base de datos o tabla especifica que tenemos dentro de ShymuDB en este caso "users" y luego el Schema que acabamos de crear.
const UserModel = mongoose.model("users", UserSchema)


//!Lo exportamos para tener acceso a este modelo fuera de este archivo.
module.exports = UserModel;