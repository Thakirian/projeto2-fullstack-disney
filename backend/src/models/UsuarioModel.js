import db from '../config/database.js';

const UsuarioModel = {
  /**
   * Encontra um usuário pelo email
   * @param {string} email 
   * @returns {Promise<object | undefined>} O usuário encontrado ou undefined
   */
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM usuarios WHERE email = ?";
      
      db.get(query, [email], (err, row) => {
        if (err) {
          console.error("Erro no UsuarioModel.findByEmail:", err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
};

export default UsuarioModel;