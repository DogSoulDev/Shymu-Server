const mongoose = require("mongoose");

//*Creo el Schema de los usuarios que tengo en mi base de datos de mongodb compass, en este caso dentro de ShymuDB tengo users.
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	username: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: false,
	},
});

//*Aqui ponemos el nombre de nuestra base de datos o tabla especifica que tenemos dentro de ShymuDB en este caso "users" y luego el Schema que acabamos de crear.
const UserModel = mongoose.model("users", UserSchema);

//*Lo exportamos para tener acceso a este modelo fuera de este archivo.
module.exports = UserModel;
