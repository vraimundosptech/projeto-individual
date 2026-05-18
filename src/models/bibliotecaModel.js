var database = require("../database/config");

function listar(idUsuario) {
  var instrucao = `
        SELECT
            j.idJogo,
            j.nome as 'jogo',
            ifnull(a.nota, '') as nota,
            bj.statusJogo
        FROM jogo j
        right JOIN biblioteca_jogo bj
            ON j.idJogo = bj.fkJogo
        left JOIN biblioteca b
            ON b.idBiblioteca = bj.fkBiblioteca
        left JOIN avaliacao a
            ON j.idJogo = a.fkJogo 
            AND a.fkUsuario = b.fkUsuario
        WHERE b.fkUsuario = ${idUsuario}
        ORDER BY jogo;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
