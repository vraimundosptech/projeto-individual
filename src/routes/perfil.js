var express = require("express");
var router = express.Router();
var perfilController = require("../controllers/perfilController");

router.get("/listar/:idUsuario",  function (req, res) {
    perfilController.listar(req, res);
});

module.exports = router;