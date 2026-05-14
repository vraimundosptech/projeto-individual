var express = require("express");
var router = express.Router();
var kpisController = require("../controllers/kpisController");

router.get("/listar/:idUsuario",  function (req, res) {
    kpisController.listar(req, res);
});

module.exports = router;