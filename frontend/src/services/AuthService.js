// Local Storage Key para o token JWT
const TOKEN_KEY = 'magic_admin_token';

// URL base do backend (assumindo que a Tha usará a porta 3001)
// Mantenha o endereço completo para facilitar testes locais
const API_URL = 'http://localhost:3001/api/login'; 

// 1. Envia credenciais e recebe o token do backend
const login = async (email, password) => {
    // 🚨 AQUI ENTRARÁ O FETCH REAL PARA A ROTA /login DA THA
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Se a resposta não for 200 OK, lança um erro com a mensagem do backend
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha na autenticação');
        }

        const data = await response.json();
        const token = data.token;
        
        // Armazena o token na função de sucesso
        localStorage.setItem(TOKEN_KEY, token);
        return true; // Retorna sucesso
        
    } catch (error) {
        console.error("Erro no AuthService Login:", error.message);
        throw error; // Propaga o erro para o componente Login exibir ao usuário
    }
};

// 2. Remove o token do localStorage
const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// 3. Verifica se o usuário está logado
const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null;
};

// 4. Obtém o token para usar em requisições protegidas
const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Exporta as funções para serem usadas pelo Context
export default {
    login,
    logout,
    isAuthenticated,
    getToken,
};