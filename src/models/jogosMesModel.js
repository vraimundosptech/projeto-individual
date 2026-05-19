var database = require("../database/config");

function listar(idUsuario) {
  var instrucao = `
    WITH RECURSIVE ultimosMeses AS (
      SELECT 
        DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 5 MONTH) AS mes

      UNION ALL

      SELECT 
        DATE_ADD (mes, INTERVAL 1 MONTH)
      FROM ultimosMeses
      WHERE mes < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    )

    SELECT
      MONTH(u.mes) AS mes,
      SUM(
        CASE
          WHEN YEAR(bj.dtAdicionado) = YEAR(u.mes)
           AND MONTH(bj.dtAdicionado) = MONTH(u.mes)
          THEN 1
          ELSE 0
        END
      ) AS qtdJogos,
      SUM(
        CASE
          WHEN bj.statusJogo = 'Zerado'
           AND YEAR(bj.dtModificacaoStatus) = YEAR(u.mes)
           AND MONTH(bj.dtModificacaoStatus) = MONTH(u.mes)
          THEN 1
          ELSE 0
        END
      ) AS qtdZerados
    FROM ultimosMeses u
    LEFT JOIN biblioteca b
      ON b.fkUsuario = ${idUsuario}
    LEFT JOIN biblioteca_jogo bj
      ON bj.fkBiblioteca = b.idBiblioteca
    GROUP BY u.mes
    ORDER BY u.mes;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
};
