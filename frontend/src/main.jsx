// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import disneyTheme from './theme.js';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext.jsx';
import { AuthProvider } from './services/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* A MUDANÇA ESTÁ AQUI: 
      Adicionamos a propriedade "basename" para dizer ao Roteador
      que nosso site não vive na raiz, mas sim na pasta /Disney-pedia/
    */}
    <BrowserRouter basename="/Disney-pedia/">
      <ThemeProvider theme={disneyTheme}>
        <CssBaseline />
        <AuthProvider> 
          <SearchProvider>
            <App />
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);