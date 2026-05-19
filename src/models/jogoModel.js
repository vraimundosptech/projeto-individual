var database = require("../database/config");

function listar() {
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
  listar,
};
