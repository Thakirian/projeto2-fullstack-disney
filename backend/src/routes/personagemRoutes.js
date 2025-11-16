import express from 'express';
import jwt from 'jsonwebtoken';
import PersonagemModel from '../models/PersonagemModel.js';

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.warn("Tentativa de acesso com token inválido:", err.message);
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    req.user = user;
    next();
  });
};

router.get('/personagens', authMiddleware, async (req, res) => {
  console.log(`Usuário ${req.user.email} está fazendo uma busca...`);
  
  try {
    const { nome } = req.query;
    const searchTerm = nome ? `%${nome}%` : '%';

    const rows = await PersonagemModel.find(searchTerm);

    const parsedRows = rows.map(row => ({
      ...row,
      filmes: row.filmes ? JSON.parse(row.filmes) : [],
      tvShows: row.tvShows ? JSON.parse(row.tvShows) : []
    }));
    
    res.status(200).json(parsedRows);

  } catch (err) {
    console.error('Erro no banco de dados ao buscar personagens:', err.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.post('/personagens', authMiddleware, async (req, res) => {
  try {
    const { nome, imageUrl, filmes, tvShows } = req.body; 

    if (!nome) {
      return res.status(400).json({ message: "O campo 'nome' é obrigatório." });
    }
    
    const params = [
      nome, 
      imageUrl || null, 
      filmes && filmes.length > 0 ? JSON.stringify(filmes) : null, 
      tvShows && tvShows.length > 0 ? JSON.stringify(tvShows) : null
    ];

    const newId = await PersonagemModel.create(params);
    
    console.log(`Usuário ${req.user.email} inseriu um novo personagem com ID: ${newId}`);
    res.status(201).json({ 
      message: "Personagem criado com sucesso!", 
      id: newId
    });

  } catch (err) {
    console.error('Erro no banco de dados ao inserir personagem:', err.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

export default router;