import express from 'express';
import jwt from 'jsonwebtoken';
import NodeCache from 'node-cache';
import { body, validationResult } from 'express-validator'; // (Sanitizers)

import PersonagemModel from '../models/PersonagemModel.js';
import logger from '../config/logger.js'; // (Monitoramento)

// Configuração do Cache (100 segundos de duração)
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); 

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn(`Tentativa de acesso com token inválido: ${err.message}`);
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    req.user = user;
    next();
  });
};

// ROTA DE BUSCA (GET) - Com Cache Implementado
router.get('/personagens', authMiddleware, async (req, res) => {
  try {
    const { nome } = req.query;
  
    const cacheKey = `personagens_${nome || 'all'}`;
    
    // 1. Verifica se a resposta já está salva no cache
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
      logger.info(`Busca por "${nome || 'todos'}" retornada do CACHE.`);
      return res.status(200).json(cachedData);
    }

    // 2. Se não estiver no cache, busca no banco
    logger.info(`Usuário ${req.user.email} buscando no BANCO DE DADOS...`);
    const searchTerm = nome ? `%${nome}%` : '%';
    const rows = await PersonagemModel.find(searchTerm);

    const parsedRows = rows.map(row => ({
      ...row,
      filmes: row.filmes ? JSON.parse(row.filmes) : [],
      tvShows: row.tvShows ? JSON.parse(row.tvShows) : []
    }));
    
    // 3. Salva o resultado no cache para a próxima vez
    myCache.set(cacheKey, parsedRows);

    res.status(200).json(parsedRows);

  } catch (err) {
    logger.error(`Erro ao buscar personagens: ${err.message}`);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.post('/personagens', 
  [
    authMiddleware, 
    body('nome').trim().escape().notEmpty().withMessage("O campo 'nome' é obrigatório.")
  ], 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nome, imageUrl, filmes, tvShows } = req.body; 
      
      const params = [
        nome, 
        imageUrl || null, 
        filmes && filmes.length > 0 ? JSON.stringify(filmes) : null, 
        tvShows && tvShows.length > 0 ? JSON.stringify(tvShows) : null
      ];

      const newId = await PersonagemModel.create(params);
      
      myCache.del('personagens_all'); 
      
      logger.info(`Usuário ${req.user.email} inseriu personagem ID: ${newId}`);
      res.status(201).json({ 
        message: "Personagem criado com sucesso!", 
        id: newId
      });

    } catch (err) {
      logger.error(`Erro ao inserir personagem: ${err.message}`);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
});

export default router;