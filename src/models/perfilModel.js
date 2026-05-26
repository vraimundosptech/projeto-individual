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

function ultimasAvaliacoes(idUsuario) {
  var instrucao = `
        SELECT 
          j.capa,
          j.nome,
          j.desenvolvedora,
          YEAR(j.dtLancamento) as ano,
          (SELECT nome FROM categoria c
          WHERE j.fkCategoria = c.idCategoria) as categoria,
          a.comentario,
          a.nota,
          CASE
            WHEN TIMESTAMPDIFF(MINUTE, a.dataAvaliacao, current_timestamp()) < 1
              THEN 'Agora'
            WHEN TIMESTAMPDIFF(MINUTE, a.dataAvaliacao, CURRENT_TIMESTAMP()) >= 1 AND TIMESTAMPDIFF(MINUTE, a.dataAvaliacao, CURRENT_TIMESTAMP()) < 59
              THEN CONCAT(TIMESTAMPDIFF(MINUTE, a.dataAvaliacao, CURRENT_TIMESTAMP()),'min atrás')
            WHEN TIMESTAMPDIFF(HOUR, a.dataAvaliacao, CURRENT_TIMESTAMP()) >= 1 AND TIMESTAMPDIFF(HOUR, a.dataAvaliacao, CURRENT_TIMESTAMP()) < 24
              THEN CONCAT(TIMESTAMPDIFF(HOUR, a.dataAvaliacao, CURRENT_TIMESTAMP()),'h atrás')
            WHEN TIMESTAMPDIFF(DAY, a.dataAvaliacao, CURRENT_TIMESTAMP()) >= 1 AND TIMESTAMPDIFF(DAY, a.dataAvaliacao, CURRENT_TIMESTAMP()) < 30
              THEN CONCAT(TIMESTAMPDIFF(DAY, a.dataAvaliacao, CURRENT_TIMESTAMP()),'d atrás')
            WHEN TIMESTAMPDIFF(MONTH, a.dataAvaliacao, CURRENT_TIMESTAMP()) >= 1 AND TIMESTAMPDIFF(MONTH, a.dataAvaliacao, CURRENT_TIMESTAMP()) < 12
              THEN CONCAT(TIMESTAMPDIFF(MONTH, a.dataAvaliacao, CURRENT_TIMESTAMP()),'m atrás')
            WHEN TIMESTAMPDIFF(YEAR, a.dataAvaliacao, CURRENT_TIMESTAMP()) >= 1
              THEN CONCAT(TIMESTAMPDIFF(YEAR, a.dataAvaliacao, CURRENT_TIMESTAMP()),'a atrás')
          END as diferencaData
        FROM jogo j
        JOIN avaliacao a
          ON a.fkJogo = j.idJogo
        JOIN usuario u
          ON a.fkUsuario = u.idUsuario
        WHERE u.idUsuario = 1
        ORDER BY dataAvaliacao DESC
        LIMIT 3;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
  ultimasAvaliacoes,
};
