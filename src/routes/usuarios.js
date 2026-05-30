var express = require("express");
var router = express.Router();
const upload = require('../config/configUploadPerfil');
var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscarId/:nomeUsuario", function (req, res) {
    usuarioController.buscarId(req, res);
});

router.put("/editar/:idUsuario", upload.single('foto'), function (req, res) {
    usuarioController.editar(req, res);
});

module.exports = router;