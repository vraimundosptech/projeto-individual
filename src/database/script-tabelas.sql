CREATE DATABASE gamescore;

USE gamescore;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
nomeUsuario VARCHAR(45) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(45) NOT NULL
);

CREATE TABLE biblioteca (
idBiblioteca INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT UNIQUE NOT NULL,
CONSTRAINT constFkUsuario_biblioteca
FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

CREATE TABLE categoria (
idCategoria INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL
);

CREATE TABLE jogo (
idJogo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(255),
dtLancamento DATE,
classificacaoIdade VARCHAR(5),
desenvolvedora VARCHAR(100),
fkCategoria INT NOT NULL,
CONSTRAINT chClassificacaoIdade
CHECK(classificacaoIdade IN ('Livre', '6', '10', '12', '14', '16', '18')),
CONSTRAINT constFkCategoria
FOREIGN KEY (fkCategoria) REFERENCES categoria (idCategoria)
);

CREATE TABLE biblioteca_jogo (
fkBiblioteca INT NOT NULL,
fkJogo INT NOT NULL,
statusJogo VARCHAR(20),
dtModificacaoStatus DATE DEFAULT(CURRENT_TIMESTAMP),
dtAdicionado DATE DEFAULT(CURRENT_TIMESTAMP),
CONSTRAINT chStatusJogo
CHECK(statusJogo IN ('Zerado', 'Jogando', 'Quero jogar', 'Pausado')),
CONSTRAINT constFkBiblioteca
FOREIGN KEY (fkBiblioteca) REFERENCES biblioteca (idBiblioteca),
CONSTRAINT constFkJogo_biblioteca_jogo
FOREIGN KEY (fkJogo) REFERENCES jogo (idJogo),
PRIMARY KEY (fkBiblioteca, fkJogo)
);

CREATE TABLE avaliacao (
idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
nota CHAR(1) NOT NULL,
comentario VARCHAR(255),
dataAvaliacao DATETIME DEFAULT(CURRENT_TIMESTAMP),
fkUsuario INT NOT NULL,
fkJogo INT NOT NULL,
CONSTRAINT chNota
CHECK(nota >= 1 AND nota <= 5),
CONSTRAINT uqUsuarioJogo UNIQUE (fkUsuario, fkJogo),
CONSTRAINT constFkUsuario_avaliacao
FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario),
CONSTRAINT constFkJogo_avaliacao
FOREIGN KEY (fkJogo) REFERENCES jogo (idJogo)
);

CREATE TABLE quiz (
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100),
descricao VARCHAR(255)
);

CREATE TABLE pergunta (
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
enunciado VARCHAR(255) NOT NULL,
fkQuiz INT NOT NULL,
CONSTRAINT constFkQuiz
FOREIGN KEY (fkQuiz) REFERENCES quiz (idQuiz)
);

CREATE TABLE alternativa (
idAlternativa INT PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR(100) NOT NULL,
correta BOOLEAN NOT NULL,
fkPergunta INT NOT NULL,
CONSTRAINT constFkPergunta_alternativa
FOREIGN KEY (fkPergunta) REFERENCES pergunta (idPergunta)
);

CREATE TABLE resposta (
idResposta INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT NOT NULL,
fkPergunta INT NOT NULL,
fkAlternativa INT NOT NULL,
dtResposta DATETIME DEFAULT(CURRENT_TIMESTAMP),
CONSTRAINT uqUsuarioPergunta UNIQUE (fkUsuario, fkPergunta),
CONSTRAINT constFkUsuario_resposta
FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario),
CONSTRAINT constFkPergunta_resposta
FOREIGN KEY (fkPergunta) REFERENCES pergunta (idPergunta),
CONSTRAINT constFkAlternativa
FOREIGN KEY (fkAlternativa) REFERENCES alternativa (idAlternativa)
);