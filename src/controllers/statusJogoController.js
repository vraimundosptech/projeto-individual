var statusJogoModel = require("../models/statusJogoModel");

function listar(req, res) {
  var idBiblioteca = req.params.idBiblioteca;

  statusJogoModel
    .listar(idBiblioteca)
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
