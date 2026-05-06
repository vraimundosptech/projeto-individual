var express = require("express");
var router = express.Router();
var statusJogoController = require("../controllers/statusJogoController");

router.get("/listar/:idUsuario",  function (req, res) {
    // função a ser chamada quando acessar /filmes/listar
    statusJogoController.listar(req, res);
});

module.exports = router;