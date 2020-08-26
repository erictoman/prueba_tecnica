//Librerias
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

//Usuario
var SchemaUsuario = new mongoose.Schema({
  usuario: String,
  password: String,
});
const Usuario = mongoose.model("Usuario", SchemaUsuario);

//Coneccion a mongodb
var uri = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log("Conectado a mongodb");
  },
  (err) => {
    throw err;
  }
);
//JWT
var jwt = require("jsonwebtoken");
//Secreto
var token_pass = "HALO INFINTE";

router.post("/api/login", (req, res) => {
  var usuarioB = req.body.usuario;
  var passwordB = req.body.password;
  if (usuarioB != undefined && passwordB != undefined) {
    Usuario.find({ usuario: req.body.usuario }, (error, resbusqueda) => {
      if (error) {
        throw error;
      }
      if (resbusqueda.length == 0) {
        res.send({ token: "" });
      } else {
        res.send({ token: "" });
        return;
      }
    });
  } else {
    res.send({ resultado: "Error" });
  }
});

router.post("/api/signup", (req, res) => {
  var usuarioB = req.body.usuario;
  var passwordB = req.body.password;
  if (usuarioB != undefined && passwordB != undefined) {
    Usuario.find({ usuario: req.body.usuario }, (error, resbusqueda) => {
      if (error) {
        throw error;
      }
      if (resbusqueda.length == 0) {
        var usuarioaux = new Usuario({
          usuario: usuarioB,
          password: passwordB,
        });
        Usuario.collection.insertOne(usuarioaux, (err, docs) => {
          if (err) {
            throw err;
          } else {
            res.send({ resultado: "ok" });
            return;
          }
        });
      } else {
        res.send({ resultado: "Usuario ya existe" });
        return;
      }
    });
  } else {
    res.send({ resultado: "Error" });
  }
});

router.post("/api/altaregistro", (req, res) => {});
router.post("/api/ultimoregistro", (req, res) => {});
router.get("/api/test", (req, res) => {
  res.send({ prueba: "ok" });
});

module.exports = router;
