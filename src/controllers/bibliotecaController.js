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

function cadastrar(req, res) {
  var idUsuario = req.body.idUsuarioVar || req.body.idUsuarioServer;
  var idJogo = req.body.idJogoVar || req.body.idJogoServer;

  if (idUsuario == undefined) {
    res.status(400).send("Seu idUsuario está undefined!");
  } else if (idJogo == undefined) {
    res.status(400).send("Seu idJogo está undefined!");
  } else {
    bibliotecaModel
      .cadastrar(idUsuario, idJogo)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  listar,
  cadastrar,
};
