import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

const router = express.Router();

// Rota: POST /api/login

router.post('/login', (req, res) => {

  // 1. Pega os dados do corpo da requisição
  const { email, senha } = req.body;

  // 2. Validação de preenchimento 
  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  // 3. Busca o usuário no banco de dados
  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err) {
      // Log de erro no servidor
      console.error('Erro no banco de dados ao tentar logar:', err.message);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    // 4. Verifica se o usuário existe
    if (!user) {
      // Log de segurança 
      console.warn(`Tentativa de login falhou (usuário não encontrado): ${email}`);
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // 5. Compara a senha enviada com a senha criptografada no banco
    const senhaValida = bcrypt.compareSync(senha, user.senha_hash);

    if (!senhaValida) {
      // Log de segurança 
      console.warn(`Tentativa de login falhou (senha inválida) para: ${email}`);
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // 6. Se tudo estiver correto, cria o Token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, // A chave secreta do nosso .env
      { expiresIn: '1h' } 
    );

    // 7. Envia a resposta de sucesso com o token
    console.log(`Usuário ${email} logado com sucesso.`);
    res.status(200).json({ 
      message: "Login bem-sucedido!", 
      token: token 
    });
  });
});

export default router;