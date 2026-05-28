var express = require("express");
var router = express.Router();
var favoritosController = require("../controllers/favoritosController");

router.get("/listar/:idBiblioteca",  function (req, res) {
    favoritosController.listar(req, res);
});

module.exports = router;