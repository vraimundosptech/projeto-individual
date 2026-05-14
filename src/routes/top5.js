var express = require("express");
var router = express.Router();
var top5Controller = require("../controllers/top5Controller");

router.get("/listar/:idUsuario",  function (req, res) {
    top5Controller.listar(req, res);
});

module.exports = router;