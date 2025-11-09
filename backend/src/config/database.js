import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

// ENCONTRAR O CAMINHO DO ARQUIVO DO BANCO DE DADOS

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '..', '..', 'database.db'); 

// CONECTAR AO BANCO DE DADOS (E CRIÁ-LO SE NÃO EXISTIR)

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    criarTabelas();
  }
});

// FUNÇÃO PARA CRIAR AS TABELAS

function criarTabelas() {
  db.serialize(() => {

    // 1. Tabela de Usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        senha_hash TEXT NOT NULL
      )
    `, (err) => {
      if (err) console.error("Erro ao criar tabela 'usuarios'", err.message);
      else {
        console.log("Tabela 'usuarios' verificada/criada com sucesso.");
        inserirUsuarioAdmin();
      }
    });

    // 2. Tabela de Personagens (baseada no P1)
    db.run(`
      CREATE TABLE IF NOT EXISTS personagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        imageUrl TEXT,
        filmes TEXT,
        tvShows TEXT
      )
    `, (err) => {
      if (err) console.error("Erro ao criar tabela 'personagens'", err.message);
      else console.log("Tabela 'personagens' verificada/criada com sucesso.");
    });
  });
}

// FUNÇÃO PARA INSERIR UM USUÁRIO PADRÃO 

function inserirUsuarioAdmin() {
  const adminEmail = 'admin@projeto.com';
  const adminSenha = 'senha123';

  // Criptografa a senha (Requisito de Segurança)
  const senhaHash = bcrypt.hashSync(adminSenha, 10);

  const queryBusca = "SELECT * FROM usuarios WHERE email = ?";
  const queryInsere = "INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)";

  db.get(queryBusca, [adminEmail], (err, row) => {
    if (err) {
      console.error("Erro ao buscar usuário admin", err.message);
    } else if (!row) {
      db.run(queryInsere, [adminEmail, senhaHash], (err) => {
        if (err) {
          console.error("Erro ao inserir usuário admin", err.message);
        } else {
          console.log(`Usuário admin (${adminEmail} / ${adminSenha}) criado com sucesso.`);
        }
      });
    }
  });
}

// Exporta a conexão do banco para ser usada em outros arquivos
export default db;