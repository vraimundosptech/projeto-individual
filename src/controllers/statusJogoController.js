var statusJogoModel = require("../models/statusJogoModel");

function listar(req, res) {
  var idUsuario = req.params.idUsuario;

  statusJogoModel
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
