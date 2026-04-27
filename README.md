# GameScore

Plataforma web criada como projeto individual para reunir recursos voltados ao universo gamer em um único lugar. A proposta do GameScore e permitir que o usuário organize jogos, acompanhe rankings e participe de quizzes, com frontend estático, backend em Node.js/Express e persistência em MySQL.

## Status do projeto

O projeto está em desenvolvimento.

Já existe no repositório:

- landing page institucional em `public/index.html`
- tela de cadastro com validações no frontend
- tela de login integrada ao backend
- API de usuários com rotas de cadastro e autenticação
- configuracao inicial do banco de dados

Pontos que ainda estão em adaptação:

- as páginas de biblioteca, ranking e quiz são apresentadas na home, mas ainda não existem como arquivos HTML no projeto
- a pasta `public/dashboard` e parte das rotas do backend ainda usam a base original do template AquaTech
- o script SQL atual cria apenas o banco `gamescore` e a tabela `usuario`

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- MySQL
- Dotenv
- Nodemon

## Estrutura do projeto

```text
.
|-- app.js
|-- package.json
|-- public/
|   |-- index.html
|   |-- login.html
|   |-- cadastro.html
|   |-- simulador.html
|   |-- css/
|   |-- js/
|   |-- assets/
|   `-- dashboard/
`-- src/
    |-- controllers/
    |-- database/
    |-- models/
    `-- routes/
```

## Como executar localmente

### 1. Instale as dependencias

```bash
npm install
```

### 2. Configure as variaveis de ambiente

Copie os arquivos de exemplo:

```powershell
Copy-Item .env.dev-example .env.dev
Copy-Item .env-example .env
```

Preencha os valores abaixo conforme o seu ambiente:

- `AMBIENTE_PROCESSO`
- `DB_HOST`
- `DB_DATABASE`
- `DB_USER`
- `DB_PASSWORD`
- `DB_PORT`
- `APP_PORT`
- `APP_HOST`

Para desenvolvimento local, use `AMBIENTE_PROCESSO=desenvolvimento`.

### 3. Crie o banco de dados

Execute o script:

```text
src/database/script-tabelas.sql
```

No estado atual do projeto, esse script cria:

- o banco `gamescore`
- a tabela `usuario`

### 4. Defina o ambiente ativo em `app.js`

O arquivo carrega `.env` ou `.env.dev` com base nesta variavel:

```js
// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';
```

Se for rodar localmente, mantenha `desenvolvimento`.

### 5. Inicie o servidor

Modo desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

### 6. Acesse a aplicacao

Com a configuração padrão:

```text
http://localhost:8080
```

## Rotas principais

### Usuarios

- `POST /usuarios/cadastrar` cria um novo usuário
- `POST /usuarios/autenticar` autentica o usuário e retorna os dados básicos da sessão

### Rotas herdadas do template

As rotas abaixo existem no backend, mas ainda dependem da adaptacao completa do projeto e de tabelas que não são criadas pelo script SQL atual:

- `/avisos`
- `/medidas`
- `/aquarios`
- `/empresas`

## Licença

Este projeto está sob a licenca MIT. Consulte o arquivo `LICENSE` para mais detalhes.
