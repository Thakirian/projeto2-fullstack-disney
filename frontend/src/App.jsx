import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InsertPage from './pages/InsertPage'; 

function App() {
  // Simulação de autenticação: Iremos implementar a lógica real depois.
  const isAuthenticated = true; 
  
  // Componente Auxiliar para envolver o layout base (opcionalmente)
  const Layout = ({ children }) => (
    <div style={{ padding: '0 20px' }}>
      {/* Aqui você pode adicionar um componente de NavBar futuro, se houver */}
      {children}
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rota de Login (Não exige autenticação) */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas Protegidas (Exigem autenticação) */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Layout><DashboardPage /></Layout> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/insert" 
          element={isAuthenticated ? <Layout><InsertPage /></Layout> : <Navigate to="/login" />} 
        />
        
        {/* Rota Padrão: Redireciona a raiz para o Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Rota 404 */}
        <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;