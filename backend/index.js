import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import db from './src/config/database.js';

import authRoutes from './src/routes/authRoutes.js';
import personagemRoutes from './src/routes/personagemRoutes.js';

const app = express();
const PORT = 3001; 

// Middlewares
app.use(express.json()); 
app.use(cors()); 

// Uma rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'Olá do Backend!' });
});

app.use('/api', authRoutes);
app.use('/api', personagemRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});