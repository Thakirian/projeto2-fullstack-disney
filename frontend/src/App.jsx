import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute'; 

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InsertPage from './pages/InsertPage';

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
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route 
        path="/dashboard" 
        element={<ProtectedRoute element={<Layout><DashboardPage /></Layout>} />} 
      />
      
      <Route 
        path="/insert" 
        element={<ProtectedRoute element={<Layout><InsertPage /></Layout>} />} 
      />

      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />

    </Routes>
  );
}

export default App;