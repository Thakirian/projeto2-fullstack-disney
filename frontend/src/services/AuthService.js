const TOKEN_KEY = 'magic_admin_token';

const API_URL = 'http://localhost:3001/api/login'; 

const login = async (email, password) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha na autenticação');
        }

        const data = await response.json();
        const token = data.token;

        localStorage.setItem(TOKEN_KEY, token);
        return true;
        
    } catch (error) {
        console.error("Erro no AuthService Login:", error.message);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null;
};

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export default {
    login,
    logout,
    isAuthenticated,
    getToken,
};