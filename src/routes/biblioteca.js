var express = require("express");
var router = express.Router();
var bibliotecaController = require("../controllers/bibliotecaController");

router.post("/cadastrar", function (req, res) {
    bibliotecaController.cadastrar(req, res);
})

router.get("/listar/:idUsuario", function (req, res) {
    bibliotecaController.listar(req, res);
});

router.delete("/deletar/:idBiblioteca/:idJogo", function (req, res) {
    bibliotecaController.deletar(req, res);
});

router.post("/cadastrarBiblioteca", function (req, res) {
    bibliotecaController.cadastrarBiblioteca(req, res);
})

module.exports = router;