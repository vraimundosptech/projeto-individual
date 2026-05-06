var database = require("../database/config")

function listar(idUsuario) {
    
    var instrucao = `
        SELECT 
            c.nome AS categoria, 
            COUNT(fkJogo) AS qtdJogo 
        FROM biblioteca_jogo bj
        JOIN jogo j
        ON j.idJogo = bj.fkJogo
        JOIN categoria c
        ON c.idCategoria = j.fkCategoria
        WHERE bj.fkBiblioteca = ${idUsuario}
        GROUP BY c.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar
};