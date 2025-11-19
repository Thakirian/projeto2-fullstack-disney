import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator'; // (Sanitizers)

import UsuarioModel from '../models/UsuarioModel.js';
import logger from '../config/logger.js'; // (Monitoramento)

const router = express.Router();

router.post('/login', 
  [
    body('email').isEmail().normalizeEmail().withMessage("Email inválido"),
    body('password').trim().escape().notEmpty().withMessage("Senha obrigatória")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await UsuarioModel.findByEmail(email);

      if (!user) {
        logger.warn(`Tentativa de login falhou (usuário não encontrado): ${email}`);
        return res.status(401).json({ message: "Email ou senha inválidos." });
      }

      const senhaValida = bcrypt.compareSync(password, user.senha_hash);

      if (!senhaValida) {
        logger.warn(`Tentativa de login falhou (senha inválida) para: ${email}`);
        return res.status(401).json({ message: "Email ou senha inválidos." });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      logger.info(`Usuário ${email} logado com sucesso.`);
      res.status(200).json({ 
        message: "Login bem-sucedido!", 
        token: token 
      });

    } catch (err) {
      logger.error(`Erro na rota de login: ${err.message}`);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
});

export default router;