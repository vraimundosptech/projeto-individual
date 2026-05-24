var database = require("../database/config");

function listar(idUsuario) {
  var instrucao = `
        SELECT 
            COUNT(fkJogo) AS qtdJogos,
            (SELECT COUNT(fkJogo) FROM biblioteca_jogo
            WHERE fkBiblioteca = ${idUsuario}
            AND statusJogo = 'Zerado') AS qtdZerados
        FROM biblioteca_jogo
        WHERE fkBiblioteca = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
