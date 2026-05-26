var database = require("../database/config");

function listar(idUsuario) {
  var instrucao = `
    SELECT
      MONTH(m.mes) AS mes,
      SUM(
          CASE
              WHEN YEAR(bj.dtAdicionado) = YEAR(m.mes)
              AND MONTH(bj.dtAdicionado) = MONTH(m.mes)
              THEN 1
              ELSE 0
          END
      ) AS qtdJogos,
      SUM(
          CASE
              WHEN bj.statusJogo = 'Zerado'
              AND YEAR(bj.dtModificacaoStatus) = YEAR(m.mes)
              AND MONTH(bj.dtModificacaoStatus) = MONTH(m.mes)
              THEN 1
              ELSE 0
          END
      ) AS qtdZerados
    FROM (
      SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS mes
      UNION ALL
      SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 4 MONTH), '%Y-%m-01')
      UNION ALL
      SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 3 MONTH), '%Y-%m-01')
      UNION ALL
      SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 2 MONTH), '%Y-%m-01')
      UNION ALL
      SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
      UNION ALL
      SELECT DATE_FORMAT(CURDATE(), '%Y-%m-01')
    ) AS m
    LEFT JOIN biblioteca b
      ON b.fkUsuario = ${idUsuario}
    LEFT JOIN biblioteca_jogo bj
      ON bj.fkBiblioteca = b.idBiblioteca
    GROUP BY m.mes
    ORDER BY m.mes;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
