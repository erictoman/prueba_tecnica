//Librerias
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

//JWT
var jwt = require("jsonwebtoken");
process.env.JWT_SECRET_KEY = "HALO INFINITE";
var auth = require("express-jwt-token");

//Secreto
var token_pass = "HALO INFINITE";

//Usuario
var SchemaUsuario = new mongoose.Schema({
  usuario: String,
  password: String,
});
const Usuario = mongoose.model("Usuario", SchemaUsuario);
//Registro
var SchemaRegistro = new mongoose.Schema({
  campo1: String,
  campo2: String,
  campo3: String,
  campo4: String,
  fecha: Date,
});

const Registro = mongoose.model("Registro", SchemaRegistro);

//Coneccion a mongodb
var uri = "mongodb://189.132.190.6:27017/?gssapiServiceName=mongodb";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log("Conectado a mongodb");
  },
  (err) => {
    throw err;
  }
);

//Autenticacion JWT
router.post("/api/login", (req, res) => {
  var usuarioB = req.body.usuario;
  var passwordB = req.body.password;
  if (usuarioB != undefined && passwordB != undefined) {
    Usuario.find(
      { usuario: usuarioB, password: passwordB },
      (error, resbusqueda) => {
        if (error) {
          throw error;
        }
        if (resbusqueda.length == 1) {
          res.send({ token: jwt.sign({ usuario: usuarioB }, token_pass) });
        } else {
          res.send({ token: "" });
          return;
        }
      }
    );
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

router.post("/api/altaregistro", auth.jwtAuthProtected, (req, res) => {
  var c1 = req.body.c1;
  var c2 = req.body.c2;
  var c3 = req.body.c3;
  var c4 = req.body.c4;
  var c5 = req.body.c5;
  if (c1 && c2 && c3 && c4 && c5) {
    var reg = new Registro({
      campo1: c1,
      campo2: c2,
      campo3: c3,
      campo4: c4,
      fecha: c5,
    });
    Registro.collection.insertOne(reg);
    res.send({ resultado: "ok" });
  } else {
    res.send({ resultado: "campos incompletos" });
  }
});

router.get("/api/ultimoregistro", auth.jwtAuthProtected, (req, res) => {
  if (req.body.usuario == "eric") {
    Registro.findOne({}, null, { sort: { created_at: -1 } }, function (
      err,
      registros
    ) {
      if (err) {
        throw err;
      }
      return res.send(registros);
    });
  }
});

module.exports = router;
