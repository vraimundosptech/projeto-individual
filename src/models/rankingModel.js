var database = require("../database/config");

function listar() {
  var instrucao = `
        SELECT	
          j.idJogo,
          j.capa,
          j.nome,
          j.desenvolvedora,
          YEAR(j.dtLancamento) as anoLancamento,
          (SELECT nome FROM categoria c
          WHERE j.fkCategoria = c.idCategoria) as categoria,
          ROUND(AVG(a.nota),1) as nota
        FROM jogo j
        JOIN avaliacao a
          ON j.idJogo = a.fkJogo
        GROUP BY j.idJogo
        ORDER BY nota DESC
        LIMIT 25;
	
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
