import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit'; 

import logger from './src/config/logger.js'
import authRoutes from './src/routes/authRoutes.js';
import personagemRoutes from './src/routes/personagemRoutes.js';

const app = express();
const PORT = 3001; 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Muitas requisições deste IP, tente novamente mais tarde."
});
app.use(limiter);

app.use(express.json()); 
app.use(cors()); 

app.use(compression());


app.get('/api/test', (req, res) => {
  res.json({ message: 'Olá do Backend!' });
});

app.use('/api', authRoutes);
app.use('/api', personagemRoutes);


app.listen(PORT, () => {
  logger.info(`🚀 Servidor HTTP rodando na porta ${PORT}`);
});