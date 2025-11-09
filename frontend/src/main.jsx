import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import disneyTheme from './theme.js';
import './index.css';

// Importa os Provedores
import { SearchProvider } from './contexts/SearchContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx'; // << NOVO IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={disneyTheme}>
      <CssBaseline />
      
      {/* O AuthProvider deve ser o provedor mais externo, pois ele pode precisar de rotas */}
      <AuthProvider> 
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
      
    </ThemeProvider>
  </React.StrictMode>,
);