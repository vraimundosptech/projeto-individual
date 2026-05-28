var database = require("../database/config");
// const { cadastrar } = require("./usuarioModel");

function listar(idUsuario) {
  var instrucao = `
        SELECT
            j.capa,
            j.idJogo,
            j.nome as 'jogo',
            ifnull(a.nota, '') as nota,
            bj.statusJogo,
            bj.favorito
        FROM jogo j
        right JOIN biblioteca_jogo bj
            ON j.idJogo = bj.fkJogo
        left JOIN biblioteca b
            ON b.idBiblioteca = bj.fkBiblioteca
        left JOIN avaliacao a
            ON j.idJogo = a.fkJogo 
            AND a.fkUsuario = b.fkUsuario
        WHERE b.fkUsuario = ${idUsuario}
        ORDER BY jogo;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrar(idBiblioteca, idJogo) {
  console.log(
    "ACESSEI A BIBLIOTECA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    idBiblioteca,
    idJogo,
  );

  var instrucaoSql = `
          INSERT INTO biblioteca_jogo (fkBiblioteca, fkJogo) VALUES ('${idBiblioteca}', '${idJogo}');
      `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function deletar(idBiblioteca, idJogo) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idBiblioteca, idJogo);
  var instrucaoSql = `
        DELETE FROM biblioteca_jogo WHERE fkBiblioteca = ${idBiblioteca} AND fkJogo = ${idJogo};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarBiblioteca(idUsuario) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idUsuario);
  var instrucaoSql = `
        INSERT INTO biblioteca (fkUsuario) VALUES (${idUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  cadastrar,
  deletar,
  cadastrarBiblioteca,
};
