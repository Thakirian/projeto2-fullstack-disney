// backend/src/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UsuarioModel.js'; // <-- 1. IMPORTAMOS O MODELO

const router = express.Router();

// Rota: POST /api/login
// 2. Transformamos o controlador em "async"
router.post('/login', async (req, res) => {
  
  // 3. Adicionamos um try...catch para lidar com erros do 'await'
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    // 4. LÓGICA DO BANCO FOI PARA O MODELO
    // Trocamos db.get(...) por uma chamada limpa ao modelo
    const user = await UsuarioModel.findByEmail(email);

    if (!user) {
      console.warn(`Tentativa de login falhou (usuário não encontrado): ${email}`);
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const senhaValida = bcrypt.compareSync(password, user.senha_hash);

    if (!senhaValida) {
      console.warn(`Tentativa de login falhou (senha inválida) para: ${email}`);
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`Usuário ${email} logado com sucesso.`);
    res.status(200).json({ 
      message: "Login bem-sucedido!", 
      token: token 
    });

  } catch (err) {
    // Se o 'await' do modelo falhar, caímos aqui
    console.error('Erro na rota de login:', err.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

export default router;