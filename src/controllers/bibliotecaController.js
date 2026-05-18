var bibliotecaModel = require("../models/bibliotecaModel");

function listar(req, res) {
  var idUsuario = req.params.idUsuario;

  bibliotecaModel
    .listar(idUsuario)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
};
