var jogoModel = require("../models/jogoModel");

function listarTodos(req, res) {
  jogoModel
    .listarTodos()
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function listarUm(req, res) {
  var idJogo = req.params.idJogo;
  var idUsuario = req.params.idUsuario;

  jogoModel
    .listarUm(idJogo, idUsuario)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  var capa = req.file.filename;
  var nome = req.body.nome;
  var desenvolvedora = req.body.desenvolvedora;
  var dtLancamento = req.body.dtLancamento;
  var categoria = req.body.categoria;
  var classificacaoIdade = req.body.classificacaoIdade;
  var descricao = req.body.descricao;

  if (capa == undefined) {
    res.status(400).send("A capa está undefined!");
  } else if (nome == undefined) {
    res.status(400).send("O nome do jogo está undefined!");
  } else if (desenvolvedora == undefined) {
    res.status(400).send("A desenvolvedora está undefined!");
  } else if (dtLancamento == undefined) {
    res.status(400).send("A data de lançamento está undefined!");
  } else if (categoria == undefined) {
    res.status(400).send("A categoria está undefined!");
  } else if (classificacaoIdade == undefined) {
    res.status(400).send("A classifição de idade está undefined!");
  } else if (descricao == undefined) {
    res.status(400).send("A descrição está undefined!");
  }

  jogoModel
    .cadastrar(
      capa,
      nome,
      desenvolvedora,
      dtLancamento,
      categoria,
      classificacaoIdade,
      descricao,
    )
    .then(function (resposta) {
      res.status(200).send("Jogo cadastrado com sucesso");
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarTodos,
  listarUm,
  cadastrar,
};
