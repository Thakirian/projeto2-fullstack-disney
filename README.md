# Projeto 2: Enciclopédia Fullstack Disney 🏰
Este é o Projeto 2 da disciplina de Programação Web Fullstack (ES47B). O objetivo é construir uma aplicação web completa em 3 camadas (SPA), implementando funcionalidades de autenticação e CRUD (criação e leitura), baseada no tema do Projeto 1 (Personagens da Disney).

A aplicação consiste em um frontend em React.js e um backend em Express.js com um banco de dados SQLite.

# Funcionalidades (Requisitos)
O sistema implementa os três requisitos funcionais obrigatórios:

- Autenticação: Sistema de Login (POST /api/login) com email e senha.
- Segurança: Rotas de Busca e Inserção protegidas por Token JWT (JSON Web Token).
- Busca: Rota GET /api/personagens (protegida) para buscar personagens no banco de dados.
- Inserção: Rota POST /api/personagens (protegida) para cadastrar novos personagens no banco.

# Tecnologias Utilizadas
Este projeto é um monorepo dividido em duas aplicações independentes:

1. backend/ (Servidor)
- Node.js
- Express.js: Para o servidor e gerenciamento das rotas RESTful.
- SQLite3: Banco de dados relacional (SQL) embarcado.
- JSON Web Token (JWT): Para geração e verificação de tokens de autenticação.
- Bcrypt.js: Para criptografia (hash) das senhas de usuário.
- CORS: Para permitir a comunicação entre o frontend e o backend.
- Dotenv: Para gerenciamento de variáveis de ambiente (como a JWT_SECRET).

2. frontend/ (Cliente)
- React.js
- Vite: Como ferramenta de build e servidor de desenvolvimento.
- Material-UI (MUI): Para a biblioteca de componentes visuais.
- Context API + useReducer: Para gerenciamento de estado global.
- React Router: Para a navegação entre as páginas (Login, Dashboard, etc.).

# Como Executar o Projeto
Este projeto possui duas aplicações que devem ser executadas simultaneamente. Você precisará de dois terminais abertos.
#
**Backend (Servidor)**
Abra o primeiro terminal e siga os passos:
1. Navegue até a pasta do backend:
   cd backend
2. Instale as dependências (só na primeira vez):
   npm install
3. Inicie o servidor (em modo de desenvolvimento): 
   npm run dev

**Retorno:** O servidor backend estará rodando em http://localhost:3001
#
**Frontend (Cliente)**
Abra um segundo terminal e siga os passos:
1. Navegue até a pasta do frontend:
   cd frontend
2. Instale as dependências (só na primeira vez):
   npm install
3. Inicie o cliente React: 
   npm run dev

**Retorno:** A aplicação estará acessível no seu navegador em http://localhost:5173
#
**Usuário de Teste**

Para testar o login, utilize as credenciais padrão que são inseridas no banco de dados na primeira execução:
- Email: admin@projeto.com
- Senha: senha123

# Requisitos de Segurança Implementados
O backend foi construído seguindo os requisitos de segurança da disciplina:
- Falhas de Criptografia: Senhas são armazenadas no banco de dados usando bcrypt.js (hash + salt).
- Falhas de Identificação: O acesso às rotas de GET e POST /personagens é protegido por um middleware que valida o Token JWT enviado no cabeçalho Authorization.
- Injeção (SQL Injection): Todas as queries ao banco de dados SQLite são feitas com prepared statements (usando ? nos parâmetros) para prevenir SQL Injection.
- Validação no Servidor: As rotas de Login e Inserção validam se os campos obrigatórios (email, senha, nome) foram enviados.
- Logging: Erros de autenticação, busca e inserção são registrados no console do servidor.

# Autoras
- Giovana Kaori (Frontend)
- Thaisse Kirian Veiga (Backend)
