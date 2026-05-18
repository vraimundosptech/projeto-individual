var express = require("express");
var router = express.Router();
const upload = require('../config/configUploadJogos'); 
var jogoController = require("../controllers/jogoController");


router.post("/cadastrar", upload.single('capa'), function (req, res) {
    jogoController.cadastrar(req, res);
});

// router.get("/listar",  function (req, res) {
//     jogoController.listar(req, res);
// });

module.exports = router;