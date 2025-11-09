import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

// Cria o contexto
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    // O estado inicial é lido do localStorage ao carregar a aplicação
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
    const navigate = useNavigate();

    // Função que chama o serviço e atualiza o estado
    const login = async (email, password) => {
        try {
            await AuthService.login(email, password);
            setIsAuthenticated(true);
            navigate('/dashboard'); // Redireciona para o Dashboard em caso de sucesso
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            throw error; // Permite que o LoginPage exiba a mensagem de erro
        }
    };

    // Função de logout
    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        navigate('/login'); // Redireciona para o Login
    };

    const value = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook Customizado para facilitar o uso nos componentes
export const useAuth = () => {
    return useContext(AuthContext);
};