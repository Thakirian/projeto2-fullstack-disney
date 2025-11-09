import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; // Importamos o hook

// Este componente verifica se o usuário pode acessar a rota
const ProtectedRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAuth();
  
  // Se estiver autenticado, renderiza o componente filho
  if (isAuthenticated) {
    return Element;
  } 
  
  // Se NÃO estiver autenticado, redireciona para a página de login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;