import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            await AuthService.login(email, password);
            setIsAuthenticated(true);
            navigate('/dashboard');
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        navigate('/login');
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

export const useAuth = () => {
    return useContext(AuthContext);
};