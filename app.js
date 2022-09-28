//* Importar e inicializar express asociarlo a app para poder interactuar luego.
const express = require("express");
const app = express();

//* Importar cors:
const cors = require('cors');

//*Cargamos el archivo de todas las rutas de los controllers.
const taskRoutes = require('./routes/taskRoutes');


//* Habilitar todas las peticiones cors:
app.use(cors());
//* Para trabajar con json se carga el modulo json de express: (Para leer de objeto a json y viceversa).
app.use(express.json());
app.use(express.urlencoded({extended: true})); //*Necesaria la codificación.
app.use("/api", taskRoutes);

//* Exportar app para index.js:
module.exports = app;