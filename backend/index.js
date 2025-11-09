// backend/index.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001; 

// Middlewares
app.use(express.json()); 
app.use(cors()); 

// Uma rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'Olá do Backend!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});