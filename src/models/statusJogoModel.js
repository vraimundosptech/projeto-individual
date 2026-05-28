var database = require("../database/config");

function listar(idBiblioteca) {
  var instrucao = `     
        SELECT 
            s.status,
            COUNT(bj.statusJogo) AS qtdStatus
        FROM (
            SELECT 'Zerado' AS status
            UNION ALL SELECT 'Jogando'
            UNION ALL SELECT 'Quero jogar'
            UNION ALL SELECT 'Pausado'
        ) s
        LEFT JOIN biblioteca_jogo bj
            ON bj.statusJogo = s.status
        AND bj.fkBiblioteca = ${idBiblioteca}
        GROUP BY s.status
        ORDER BY FIELD(s.status, 'Jogando', 'Zerado', 'Quero jogar', 'Pausado');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
