import db from '../config/database.js';

const PersonagemModel = {
  /**
   * Busca personagens por nome (com LIKE)
   * @param {string} nomeTermo O termo de busca (ex: '%Mickey%')
   * @returns {Promise<Array>} Um array de personagens
   */
  find: (nomeTermo) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM personagens WHERE nome LIKE ?";
      
      db.all(query, [nomeTermo], (err, rows) => {
        if (err) {
          console.error("Erro no PersonagemModel.find:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  /**
   * Cria um novo personagem no banco
   * @param {Array} params Os dados do personagem [nome, imageUrl, filmes, tvShows]
   * @returns {Promise<number>} O ID do novo personagem
   */
  create: (params) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO personagens (nome, imageUrl, filmes, tvShows) 
        VALUES (?, ?, ?, ?)
      `;

      db.run(query, params, function (err) {
        if (err) {
          console.error("Erro no PersonagemModel.create:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
};

export default PersonagemModel;