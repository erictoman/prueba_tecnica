//Librerias
const express = require("express");
const http = require("http");

//Express
const app = express();
require("./rutas.js")(app);
//Express sobre http
const server = http.createServer(app);
//Puerto ya sea por el entorno o definido por mi.
const PORT = process.env.PORT || 1330;

//Lanzar servidor
server.listen(PORT, () => {
  console.log(`Servidor en ${PORT}`);
});
