var express = require("express");
var router = express.Router();
var statusJogoController = require("../controllers/statusJogoController");

router.get("/listar/:idBiblioteca",  function (req, res) {
    statusJogoController.listar(req, res);
});

module.exports = router;