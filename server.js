//*Primer paso en verde.
//?Puntos a tener en cuenta.
//!Importante.

//*Importar mongoose.
const mongoose = require("mongoose");
//*Importamos dotenv y lo llamamos(para que lea lo que tenemos en el archivo .env)."
const dotenv = require("dotenv");
dotenv.config();

//*Importamos app y le agregamos el framework de express.
const app = require("./app");

//*Conecta Nodejs con Mongodb usando mongoose(javascript library).
mongoose.connect(`${process.env.DB_MONGODB}`, (err, req) => {
	try {
		if (err) {
			throw err;
		} else {
			console.log("Connection to Database OK!");
		}
	} catch (error) {
		console.error("Error connecting to Database!");
	}
});


app.listen(`${process.env.DB_PORT}`, (req, res) => {
	console.log("Server runs OK");
});