var express = require("express");
var router = express.Router();
var perfilController = require("../controllers/perfilController");

router.get("/listar/:idUsuario",  function (req, res) {
    perfilController.listar(req, res);
});

router.get("/ultimasAvaliacoes/:idUsuario",  function (req, res) {
    perfilController.ultimasAvaliacoes(req, res);
});

module.exports = router;