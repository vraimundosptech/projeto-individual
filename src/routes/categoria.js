var express = require("express");
var router = express.Router();
var categoriaController = require("../controllers/categoriaController");

router.get("/listar/:idUsuario",  function (req, res) {
    // função a ser chamada quando acessar /filmes/listar
    categoriaController.listar(req, res);
});

module.exports = router;