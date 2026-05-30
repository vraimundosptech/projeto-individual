# GameScore

GameScore é uma plataforma web para organizar jogos, acompanhar estatísticas da biblioteca e avaliar títulos da comunidade.

O projeto foi desenvolvido com frontend em HTML, CSS e JavaScript, backend em Node.js/Express e banco de dados MySQL.

## Funcionalidades

- Cadastro e login de usuários;
- Criação automática de biblioteca para cada usuário;
- Adição, remoção e cadastro de jogos;
- Filtros por status: `Jogando`, `Zerado`, `Quero jogar` e `Pausado`;
- Favoritos;
- Avaliação de jogos com nota e comentário;
- Dashboard com gráficos e KPIs;
- Ranking global dos jogos mais bem avaliados;
- Perfil com foto, descrição e últimas avaliações.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- Multer
- Chart.js

## Estrutura

```
.
|-- app.js
|-- package.json
|-- public/
|   |-- index.html
|   |-- login.html
|   |-- cadastro.html
|   |-- usuario/
|   |-- css/
|   |-- js/
|   `-- assets/
`-- src/
    |-- config/
    |-- controllers/
    |-- database/
    |-- models/
    `-- routes/
```

## Como rodar

Instale as dependências:

```
npm install
```

Configure as variáveis principais do .env /.env.dev:

```
AMBIENTE_PROCESSO=desenvolvimento
DB_HOST=localhost
DB_DATABASE=gamescore
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=3306
APP_PORT=8080
APP_HOST=localhost
```

Crie o banco executando:

```
src/database/script-tabelas.sql
```

Inicie o servidor:

```
npm run dev
```

Acesse:

```
http://localhost:8080
```

## Scripts

```
npm start
```

Executa o projeto com `node app.js`.

```
npm run dev
```

Executa o projeto com `nodemon`.

## Páginas principais

- `/index.html`
- `/login.html`
- `/cadastro.html`
- `/usuario/dashboard.html`
- `/usuario/biblioteca.html`
- `/usuario/jogo.html`
- `/usuario/ranking.html`
- `/usuario/perfil.html`

## Banco de dados

O script SQL cria as tabelas principais do sistema:

- `usuario`
- `biblioteca`
- `categoria`
- `jogo`
- `biblioteca_jogo`
- `avaliacao`

## Licença

Este projeto está sob a licença MIT.
