import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, CircularProgress } from '@mui/material';
import AuthService from '../services/AuthService'; // << NOVO IMPORT: Para pegar o token

// CÓDIGO DA THA:
// 🚨 ATENÇÃO: Se a Tha usar outra porta/URL, mude esta linha.
const API_URL_INSERT = 'http://localhost:3001/api/personagens'; 

function InsertPage() {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [films, setFilms] = useState('');
    const [tvShows, setTvShows] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);
    const [loading, setLoading] = useState(false); // << NOVO ESTADO

    const handleSubmit = async (e) => { // << TORNADO ASSÍNCRONO
        e.preventDefault();
        setStatusMessage(null);

        if (!name || !imageUrl) {
            setStatusMessage({ type: 'error', message: 'O Nome e a URL da Imagem são obrigatórios.' });
            return;
        }

        setLoading(true);

        // 1. Prepara os dados (transforma strings de vírgula em arrays para o .NET)
        const newCharacter = {
            name,
            imageUrl,
            // .NET/C# geralmente espera arrays de string
            films: films.split(',').map(item => item.trim()).filter(item => item.length > 0), 
            tvShows: tvShows.split(',').map(item => item.trim()).filter(item => item.length > 0),
        };
        
        // 2. Obtém o token para a requisição protegida
        const token = AuthService.getToken();

        try {
            const response = await fetch(API_URL_INSERT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 🔑 Envia o token
                },
                body: JSON.stringify(newCharacter),
            });

            if (!response.ok) {
                // Lidar com erros específicos da API
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao cadastrar personagem.');
            }

            // 3. Sucesso: Limpa o formulário e exibe mensagem
            setStatusMessage({ type: 'success', message: `Personagem "${name}" cadastrado com sucesso!` });
            setName('');
            setImageUrl('');
            setFilms('');
            setTvShows('');

        } catch (error) {
            // 4. Falha: Exibe a mensagem de erro
            setStatusMessage({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 4, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                Cadastrar Novo Personagem 📝
            </Typography>

            {statusMessage && (
                <Alert severity={statusMessage.type} sx={{ mb: 2 }}>
                    {statusMessage.message}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                {/* Campos do Formulário (Adicionado 'disabled={loading}') */}
                <TextField
                  required
                  fullWidth
                  label="Nome do Personagem"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  disabled={loading}
                />
                
                <TextField
                  required
                  fullWidth
                  label="URL da Imagem (imageUrl)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  variant="outlined"
                  disabled={loading}
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Filmes (Separe por vírgulas, ex: 'Branca de Neve, Bambi')"
                  value={films}
                  onChange={(e) => setFilms(e.target.value)}
                  variant="outlined"
                  disabled={loading}
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Séries de TV (Separe por vírgulas)"
                  value={tvShows}
                  onChange={(e) => setTvShows(e.target.value)}
                  variant="outlined"
                  disabled={loading}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 2, borderRadius: 5, bgcolor: 'primary.main' }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar e Salvar'}
                </Button>
            </Box>
        </Container>
    );
}

export default InsertPage;