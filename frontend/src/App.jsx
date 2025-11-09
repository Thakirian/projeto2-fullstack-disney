import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute'; // << NOVO IMPORT

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
  // ❌ REMOVEMOS: const isAuthenticated = true;
  // A lógica agora está no AuthContext e no ProtectedRoute

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rota de Login: Acesso livre */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rota Padrão: Redireciona a raiz para o Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* ROTAS PROTEGIDAS 
          Usamos o ProtectedRoute para garantir que só usuários logados as acessem.
        */}
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
    </BrowserRouter>
  );
}

export default App;