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

function listarUm(idJogo, idUsuario) {
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
          IFNULL(ROUND(AVG(a.nota),1), 0) as notaComunidade,
          COUNT(a.idAvaliacao) as qtdAvaliacao
        FROM jogo j
        LEFT JOIN biblioteca_jogo bj
          ON bj.fkJogo = j.idJogo
        LEFT JOIN avaliacao a
          ON j.idJogo = a.fkJogo
        WHERE idJogo = ${idJogo}
          AND bj.fkBiblioteca = ${idUsuario};
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

module.exports = {
  cadastrar,
  listarTodos,
  listarUm,
};
