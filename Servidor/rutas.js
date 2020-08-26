module.exports = function (app) {
  const { MongoClient } = require("mongodb");
  var jwt = require("jsonwebtoken");
  var token_pass = "'Secret Password'";
  app.post("/api/login", function (req, res) {});
  app.post("/api/signup", function (req, res) {});
  app.post("/api/altaregistro", function (req, res) {});
  app.post("/api/ultimoregistro", function (req, res) {});
  app.get("/api/test", function (req, res) {
    res.send({ prueba: "ok" });
  });
};
