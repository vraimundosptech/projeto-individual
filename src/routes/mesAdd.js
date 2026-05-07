var express = require("express");
var router = express.Router();
var mesAddController = require("../controllers/mesAddController");

router.get("/listar/:idUsuario",  function (req, res) {
    // função a ser chamada quando acessar /filmes/listar
    mesAddController.listar(req, res);
});

module.exports = router;