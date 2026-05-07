var database = require("../database/config")

function listar(idUsuario) {

    var instrucao = `
    WITH RECURSIVE ultimosMeses AS (
    SELECT 
        DATE_FORMAT(DATE_SUB(CURDATE(), 
        INTERVAL 5 MONTH), '%Y-%m-01') AS mes
    UNION ALL
    SELECT 
        DATE_ADD(mes, INTERVAL 1 MONTH)
    FROM ultimosMeses
    WHERE mes < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    )

    SELECT 
        MONTH(u.mes) AS mes,
        COUNT(bj.dtAdicionado) AS qtdJogos,
        COUNT(bj.dtModificacaoStatus) AS qtdZerados
    FROM ultimosMeses u
    LEFT JOIN biblioteca_jogo bj
        ON DATE_FORMAT(bj.dtAdicionado, '%Y-%m') = DATE_FORMAT(u.mes, '%Y-%m') AND
        DATE_FORMAT(bj.dtModificacaoStatus, '%Y-%m') = DATE_FORMAT(u.mes, '%Y-%m')
    GROUP BY u.mes
    ORDER BY u.mes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar
};