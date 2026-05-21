var express = require("express");
var router = express.Router();
const upload = require('../config/configUploadJogos'); 
var jogoController = require("../controllers/jogoController");


router.post("/cadastrar", upload.single('capa'), function (req, res) {
    jogoController.cadastrar(req, res);
});

router.get("/listarTodos",  function (req, res) {
    jogoController.listarTodos(req, res);
});

router.get("/listarUm/:idJogo/:idUsuario",  function (req, res) {
    jogoController.listarUm(req, res);
});

module.exports = router;