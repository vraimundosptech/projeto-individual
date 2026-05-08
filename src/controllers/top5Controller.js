var top5Model = require("../models/top5Model");

function listar(req, res) {
  const idUsuario = Number(req.params.idUsuario);
  if (!idUsuario) return res.status(400).send("idUsuario inválido");

  top5Model
    .listar(idUsuario)
    .then(function (resultado) {
      // precisamos informar que o resultado voltará para o front-end como uma resposta em json
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
};
