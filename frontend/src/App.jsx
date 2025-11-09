// frontend/src/App.jsx

import React from 'react';
// 1. REMOVA "BrowserRouter" DAQUI:
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute'; 

// Importa as novas páginas
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InsertPage from './pages/InsertPage';

// Componente Auxiliar para envolver o layout base
const Layout = ({ children }) => (
  <>
    <NavBar /> 
    <div style={{ padding: '0 20px' }}>
      {children}
    </div>
  </>
);


function App() {

  return (
    // 2. REMOVA A TAG <BrowserRouter> DAQUI
    <Routes>
      
      {/* Rota de Login: Acesso livre */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rota Padrão: Redireciona a raiz para o Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      
      {/* ROTAS PROTEGIDAS */}
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute element={<Layout><DashboardPage /></Layout>} />} 
      />
      
      <Route 
        path="/insert" 
        element={<ProtectedRoute element={<Layout><InsertPage /></Layout>} />} 
      />
      
      {/* Rota 404 */}
      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />

    </Routes>
    // 3. E REMOVA A TAG DE FECHAMENTO </BrowserRouter> DAQUI
  );
}

export default App;