const express = require("express");
//!app representa todo lo que express trae de la libreria.
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users"); //*Nos importamos el modelo Users.

//!Cors nos permite conectarnos con el Front 'sin errores'.
const cors = require("cors");

//! Esto es MUY importante ponerlo para que los objetos que nos mande el Font con peticiones, modificicaciones o lo que sea se conviertan a formato json y pueda interactuar con la base de datos.
app.use(express.json());
app.use(cors());

//! Hay que cifrar la password en: https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password
//! Hay que conectarse en mongodb compass con esta dirección: mongodb+srv://shymu1234:<password>@cluster0.oauhhpa.mongodb.net/test

//*Ahora mongoose lo conectamos desde mongodb atlas con la opcion 'connect your application'.
//*Creo una base de datos en mongodb compass y le pongo el nombre en la dirección de abajo, en este caso es 'ShymuDB'.
mongoose.connect(
	"mongodb+srv://shymu1234:shymu1234@cluster0.oauhhpa.mongodb.net/ShymuDB?retryWrites=true&w=majority",
);

//! Creamos este puente que establece la conexión entre nuestro Font y nuestra base de datos:
//!Resquest y Response, 'req'= nos pide la informacin desde el front y 'res'= nos trae la informacion de la base de datos.

//!app.get
//* Cuando se lanza la petición del front, (if/else) después de recibirla de la base de datos, si hay un error mandamos 'err' y si está bien mandamos el resultado 'res'.
//*get obviamente es solo para hacer peticiones y mover los datos.

app.get("/getUsers", (req, res) => {
	UserModel.find({}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
});

//*En el front tendremos por ejemplo un FORMULARIO y lo recibiremos en el Back asi:
//*Importante que este tipo de operaciones de agregar, actualizar o modificar datos suelen ser async
//!app.post
//*esto es la info del formulario o lo que sea que me manda el front:(const user = req.body;)
//*esto es el modelo que vamos a usar(lo creamos en el models/Users y lo exportamos como UserModel).(const newUser = new UserModel(user);)
//*Una vez recibida la info con el async, lo guardamos una vez llegue con el await y en este caso newUser que es lo que vamos a guardar.(await newUser.save();)
//* Devolvemos al front para verificar que se ha creado el usuario y que la información la hemos recibido bien en el back.(result.json(user);)
app.post("/createUser", async (req, res) => {
	const user = req.body;
	const newUser = new UserModel(user);
	await newUser.save();

	res.json(user);
});

//! Ponemos el puerto 3001 porque React usara el 3000.
app.listen(3001, (req, res) => {
	console.log("Server runs OK");
});
