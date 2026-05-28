var database = require("../database/config");

function listar(idBiblioteca) {
  var instrucao = `
        SELECT
            j.capa,
            j.nome
        FROM biblioteca_jogo bj
        JOIN jogo j
            ON bj.fkJogo = j.idJogo
        JOIN biblioteca b
            ON bj.fkBiblioteca = b.idBiblioteca
        WHERE bj.fkBiblioteca = ${idBiblioteca}
        AND favorito = true
        LIMIT 5;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
