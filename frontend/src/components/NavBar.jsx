import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log('Usuário deslogado!');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}> 
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Mágica Admin
        </Typography>

        {/* Usa o estado REAL de autenticação */}
        {isAuthenticated && (
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard" 
              sx={{ textTransform: 'none' }}
            >
              Dashboard
            </Button>
            
            <Button 
              color="inherit" 
              component={Link} 
              to="/insert" 
              sx={{ textTransform: 'none', ml: 1 }}
            >
              Inserir Personagem
            </Button>

            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{ textTransform: 'none', ml: 2 }}
            >
              Sair
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;