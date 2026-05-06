var database = require("../database/config")

function listar(idUsuario) {
    
    var instrucao = `
        SELECT 
            statusJogo AS 'status', 
            COUNT(statusJogo) AS qtdStatus 
        FROM biblioteca_jogo
        WHERE fkBiblioteca = ${idUsuario}
        GROUP BY statusJogo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar
};