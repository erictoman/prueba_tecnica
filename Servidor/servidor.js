//Librerias
const express = require("express");
var bodyParser = require("body-parser");

//Express
const app = express();
//Auxiliar parametros
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Rutas
app.use(require("./rutas"));

//Puerto ya sea por el entorno o definido por mi.
const port = process.env.PORT || 1330;

//Lanzar servidor
app.listen(port, () => {
  console.log("Servidor en el puerto: " + port);
});
