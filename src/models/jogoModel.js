var database = require("../database/config");

function listarTodos() {
  var instrucao = `
        SELECT 
          j.idJogo,
          j.capa,
          j.nome AS 'jogo',
          c.nome as 'categoria',
          j.desenvolvedora,
          DATE_FORMAT(j.dtLancamento, '%d/%m/%Y') as 'dtLancamento',
          j.classificacaoIdade
        FROM jogo j
        JOIN categoria c
          ON j.fkCategoria = c.idCategoria
        ORDER BY jogo;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarUm(idJogo, idUsuario, idBiblioteca) {
  var instrucao = `
        SELECT	
          j.capa,
          j.nome,
          (SELECT nome FROM categoria c
            WHERE j.fkCategoria = c.idCategoria) as categoria,
          j.desenvolvedora,
          DATE_FORMAT(j.dtLancamento, '%d/%m/%Y') dtLancamento,
          j.descricao,
          bj.statusJogo,
          bj.favorito,
          IFNULL(
            (SELECT an.nota FROM avaliacao an
              LEFT JOIN jogo jn
                ON jn.idJogo = an.fkJogo
              LEFT JOIN usuario un
                ON un.idUsuario = an.fkUsuario
              WHERE an.fkJogo = ${idJogo}
                AND an.fkUsuario = ${idUsuario}),
          0) as nota,
          IFNULL(
            (SELECT an.comentario FROM avaliacao an
              LEFT JOIN jogo jn
                ON jn.idJogo = an.fkJogo
              LEFT JOIN usuario un
                ON un.idUsuario = an.fkUsuario
              WHERE an.fkJogo = ${idJogo}
                AND an.fkUsuario = ${idUsuario}), 
          '') as comentario,
          IFNULL(ROUND(AVG(a.nota),1), 0) as notaComunidade,
          COUNT(a.idAvaliacao) as qtdAvaliacao
        FROM jogo j
        LEFT JOIN biblioteca_jogo bj
          ON bj.fkJogo = j.idJogo
        LEFT JOIN avaliacao a
          ON j.idJogo = a.fkJogo
        WHERE idJogo = ${idJogo}
          AND bj.fkBiblioteca = ${idBiblioteca};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrar(
  capa,
  nome,
  desenvolvedora,
  dtLancamento,
  categoria,
  classificacaoIdade,
  descricao,
) {
  var instrucao = `
        INSERT INTO jogo (capa, nome, desenvolvedora, dtLancamento, fkCategoria, classificacaoIdade, descricao) VALUES 
        ('${capa}', '${nome}', '${desenvolvedora}', '${dtLancamento}', 
            (
            SELECT idCategoria FROM categoria
            WHERE nome = '${categoria}'
            ), 
        '${classificacaoIdade}', '${descricao}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function avaliar(idJogo, idUsuario, nota, comentario) {
  var instrucao = `
    INSERT INTO avaliacao (nota, comentario, fkUsuario, fkJogo)
    VALUES ('${nota}', '${comentario}', ${idUsuario}, ${idJogo})
    ON DUPLICATE KEY UPDATE
      nota = '${nota}',
      comentario = '${comentario}',
      dataAvaliacao = CURRENT_TIMESTAMP;
  `;
  return database.executar(instrucao);
}

function categorizar(idJogo, idBiblioteca, statusJogo) {
  var instrucao = `
    UPDATE 
      biblioteca_jogo 
    SET 
      statusJogo = '${statusJogo}', 
      dtModificacaoStatus = current_timestamp
    WHERE fkBiblioteca = ${idBiblioteca}
        AND fkJogo = ${idJogo}
  `;
  return database.executar(instrucao);
}

function favoritar(idJogo, idBiblioteca, favorito) {
  var instrucao = `
    UPDATE 
      biblioteca_jogo 
    SET 
      favorito = ${favorito}
    WHERE fkBiblioteca = ${idBiblioteca}
      AND fkJogo = ${idJogo}
  `;
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  listarTodos,
  listarUm,
  avaliar,
  categorizar,
  favoritar,
};
