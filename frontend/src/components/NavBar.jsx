import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // << NOVO IMPORT

function NavBar() {
  // Consumir o hook para ter acesso ao estado e à função de logout
  const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate(); // Não é mais necessário, o logout cuida do redirecionamento

  const handleLogout = () => {
    // Chama a função de logout do AuthContext.
    // O redirecionamento para /login é gerenciado dentro do AuthContext.
    logout();
    console.log('Usuário deslogado!');
  };

  return (
    // Usa a cor primária do tema para maior consistência
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
              onClick={handleLogout} // Chama a função logout real
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