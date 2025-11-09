import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

const router = express.Router();

// O "SEGURANÇA" (Middleware de Autenticação)

const authMiddleware = (req, res, next) => {
  // 1. Pega o token do cabeçalho da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Se não tiver token, barra o usuário
  if (token == null) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  // 3. Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Log de segurança 
      console.warn("Tentativa de acesso com token inválido:", err.message);
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }

    // 4. Se o token for válido, salva os dados do usuário
    // na requisição e deixa ele "passar"
    req.user = user;
    next();
  });
};

// REQUISITO 2: ROTA DE BUSCA (GET /api/personagens)

router.get('/personagens', authMiddleware, (req, res) => {

  // O usuário (req.user) foi adicionado pelo middleware
  console.log(`Usuário ${req.user.email} está fazendo uma busca...`);

  // 1. Pega o termo de busca da URL (ex: /api/personagens?nome=Mickey)
  const { nome } = req.query;

  // 2. Sanitização 
  const searchTerm = nome ? `%${nome}%` : '%';
  const query = "SELECT * FROM personagens WHERE nome LIKE ?";

  // 3. Executa a busca no banco
  db.all(query, [searchTerm], (err, rows) => {
    if (err) {
      // Log de erro
      console.error('Erro no banco de dados ao buscar personagens:', err.message);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    // 4. Retorna os resultados
    res.status(200).json(rows);
  });
});

// REQUISITO 3: ROTA DE INSERÇÃO (POST /api/personagens)

// Protegida pelo authMiddleware
router.post('/personagens', authMiddleware, (req, res) => {

  // 1. Pega os dados do corpo da requisição
  const { nome, imageUrl, filmes, tvShows } = req.body;

  // 2. Validação de preenchimento no servidor 
  if (!nome) {
    return res.status(400).json({ message: "O campo 'nome' é obrigatório." });
  }

  // 3. Prepara a query SQL para inserção (Requisito de segurança)
  const query = `
    INSERT INTO personagens (nome, imageUrl, filmes, tvShows) 
    VALUES (?, ?, ?, ?)
  `;
  
  // O JSON.stringify é útil se 'filmes' ou 'tvShows' forem arrays
  const params = [
    nome, 
    imageUrl || null, 
    filmes ? JSON.stringify(filmes) : null, 
    tvShows ? JSON.stringify(tvShows) : null
  ];

  // 4. Executa a inserção no banco
  db.run(query, params, function (err) {
    if (err) {
      // Log de erro
      console.error('Erro no banco de dados ao inserir personagem:', err.message);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
    
    // 5. Retorna sucesso
    console.log(`Usuário ${req.user.email} inseriu um novo personagem com ID: ${this.lastID}`);
    res.status(201).json({ 
      message: "Personagem criado com sucesso!", 
      id: this.lastID 
    });
  });
});

export default router;