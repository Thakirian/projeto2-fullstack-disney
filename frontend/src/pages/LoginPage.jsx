import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // << NOVO IMPORT: Hook de autenticação

function LoginPage() {
  // Consumir o hook para ter acesso à função login
  const { login } = useAuth();
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // << NOVO ESTADO: Loading

  const handleSubmit = async (e) => { // << TORNADO ASSÍNCRONO
    e.preventDefault();
    setError(null);

    // 1. Validação básica (mantida)
    if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
    }
    
    setLoading(true); // Inicia o loading
    
    // 2. Lógica de Envio para o Backend
    try {
        // A função login é assíncrona e lida com o fetch, token e redirecionamento.
        await login(email, password); 
        // Em caso de sucesso, o redirecionamento ocorre dentro da função login.
        
    } catch (err) {
        // Em caso de erro (ex: 401 Unauthorized da Tha), exibe a mensagem de erro.
        // O erro deve ser a mensagem que vem da API, por isso 'err.message'.
        setError(err.message || 'Erro de conexão ou credenciais inválidas.');
        
    } finally {
        setLoading(false); // Finaliza o loading
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

        {/* Exibição de Erro */}
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
          disabled={loading} // Desabilita o campo durante o loading
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
          disabled={loading} // Desabilita o campo durante o loading
          sx={{ borderRadius: 5 }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading} // Desabilita o botão durante o loading
          sx={{ mt: 3, mb: 2, borderRadius: 5, bgcolor: 'primary.main' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'} 
          {/* Mostra o spinner ou o texto 'Entrar' */}
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;