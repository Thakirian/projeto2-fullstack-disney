import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useAuth } from '../services/AuthContext';

function LoginPage() {
  const { login } = useAuth();
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
    }
    
    setLoading(true);
    
    try {
        await login(email, password); 
        
    } catch (err) {
        setError(err.message || 'Erro de conexão ou credenciais inválidas.');
        
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
        component="form" 
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Acesso Administrativo
        </Typography>

        {error && (
            <Typography color="error" variant="body2">
                {error}
            </Typography>
        )}

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ borderRadius: 5 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ borderRadius: 5 }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2, borderRadius: 5, bgcolor: 'primary.main' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'} 
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;