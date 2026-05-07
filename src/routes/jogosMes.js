var express = require("express");
var router = express.Router();
var jogosMesController = require("../controllers/jogosMesController");

router.get("/listar/:idUsuario",  function (req, res) {
    // função a ser chamada quando acessar /filmes/listar
    jogosMesController.listar(req, res);
});

module.exports = router;