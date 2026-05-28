var database = require("../database/config");

function listar(idBiblioteca) {
  var instrucao = `
        SELECT 
            COUNT(fkJogo) AS qtdJogos,
            (SELECT COUNT(fkJogo) FROM biblioteca_jogo
            WHERE fkBiblioteca = ${idBiblioteca}
            AND statusJogo = 'Zerado') AS qtdZerados
        FROM biblioteca_jogo
        WHERE fkBiblioteca = ${idBiblioteca};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
