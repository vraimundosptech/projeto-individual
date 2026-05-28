var express = require("express");
var router = express.Router();
var jogosMesController = require("../controllers/jogosMesController");

router.get("/listar/:idBiblioteca",  function (req, res) {
    jogosMesController.listar(req, res);
});

module.exports = router;