var database = require("../database/config");

function listar(idUsuario) {
  var instrucao = `
        SELECT 
          u.foto,
          u.nome,
          u.nomeUsuario,
          u.descricao,
          MONTH(u.dtCriacao) mes,
          YEAR(u.dtCriacao) ano
        FROM usuario u
        WHERE idUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
