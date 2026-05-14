var database = require("../database/config");

function listar(idUsuario) {
  var instrucao = `
        SELECT j.nome, a.nota FROM avaliacao a
        JOIN jogo j
        ON j.idJogo = a.fkJogo
        WHERE fkUsuario = ${idUsuario}
        ORDER BY nota DESC
        LIMIT 5;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
