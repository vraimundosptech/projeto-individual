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
  var idBiblioteca = req.body.idBibliotecaVar || req.body.idBibliotecaServer;
  var idJogo = req.body.idJogoVar || req.body.idJogoServer;

  if (idBiblioteca == undefined) {
    res.status(400).send("Seu idBiblioteca está undefined!");
  } else if (idJogo == undefined) {
    res.status(400).send("Seu idJogo está undefined!");
  } else {
    bibliotecaModel
      .cadastrar(idBiblioteca, idJogo)
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

function deletar(req, res) {
  var idBiblioteca = req.params.idBiblioteca;
  var idJogo = req.params.idJogo;

  bibliotecaModel.deletar(idBiblioteca, idJogo)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    )
    .catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao deletar o jogo: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function cadastrarBiblioteca(req, res) {
  var idUsuario = req.body.idUsuarioServer 

  if (idUsuario == undefined) {
    res.status(400).send("Seu idUsuario está undefined!");
  } else {
    bibliotecaModel
      .cadastrarBiblioteca(idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro da biblioteca! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  listar,
  cadastrar,
  deletar,
  cadastrarBiblioteca,
};
