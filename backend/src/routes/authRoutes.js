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
  // ... (código para busca e sanitização mantido)
  
  const { nome } = req.query;
  const searchTerm = nome ? `%${nome}%` : '%';
  const query = "SELECT * FROM personagens WHERE nome LIKE ?";

  // 3. Executa a busca no banco
  db.all(query, [searchTerm], (err, rows) => {
    if (err) {
      console.error('Erro no banco de dados ao buscar personagens:', err.message);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    // 🔑 CORREÇÃO CRUCIAL: Converte Strings JSON de volta para Arrays
    const parsedRows = rows.map(row => {
        // Tenta fazer o parse, se falhar ou for null, retorna um array vazio.
        return {
            ...row,
            filmes: row.filmes ? JSON.parse(row.filmes) : [],
            tvShows: row.tvShows ? JSON.parse(row.tvShows) : []
        };
    });

    // 4. Retorna os resultados com JSONs já convertidos
    res.status(200).json(parsedRows);
  });
});

// REQUISITO 3: ROTA DE INSERÇÃO (POST /api/personagens)
router.post('/personagens', authMiddleware, (req, res) => {
  // 1. Pega os dados do corpo da requisição
  // O Frontend envia 'nome', 'imageUrl', 'filmes', 'tvShows'
  const { nome, imageUrl, filmes, tvShows } = req.body; 

  // 2. Validação de preenchimento no servidor 
  if (!nome) {
    return res.status(400).json({ message: "O campo 'nome' é obrigatório." });
  }

  // 3. Prepara a query SQL para inserção
  const query = `
    INSERT INTO personagens (nome, imageUrl, filmes, tvShows) 
    VALUES (?, ?, ?, ?)
  `;
  
  // O JSON.stringify transforma o array do Frontend em uma string para o SQLite
  const params = [
    nome, 
    imageUrl || null, 
    filmes && filmes.length > 0 ? JSON.stringify(filmes) : null, 
    tvShows && tvShows.length > 0 ? JSON.stringify(tvShows) : null
  ];

  // 4. Executa a inserção no banco
  db.run(query, params, function (err) {
    if (err) {
      console.error('Erro no banco de dados ao inserir personagem:', err.message);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
    
    res.status(201).json({ 
      message: "Personagem criado com sucesso!", 
      id: this.lastID 
    });
  });
});

export default router;