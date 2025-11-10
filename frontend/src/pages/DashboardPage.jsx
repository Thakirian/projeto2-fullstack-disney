import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import CharacterDetailsModal from '../components/CharacterDetailsModal';
import { SearchContext } from '../contexts/SearchContext';
import logo from '../image/logo.png';
import '../App.css'; 

function DashboardPage() {
  // LÓGICA DO CONTEXTO E ESTADOS
  const { personagens, carregando, erro, buscarPersonagens } = useContext(SearchContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // LÓGICA DE BUSCA INICIAL 
  useEffect(() => {
    if (personagens.length === 0 && !erro) {
       buscarPersonagens(''); 
    }
  }, [buscarPersonagens, personagens.length, erro]); 

  // HANDLERS DO MODAL
  const handleCardClick = (character) => {
      setSelectedCharacter(character);
      setIsModalOpen(true);
  };

  const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedCharacter(null); 
  };
  
  const gridKey = carregando ? 'loading' : 'loaded-' + personagens.length; 

  // Mapeamento de personagens com garantia de que a chave 'nome' e 'imageUrl' existem
  const charactersData = personagens.map(p => ({
      // Priorizamos a chave em português 'nome', mas aceitamos o 'name' em inglês (o que estava vindo)
      nome: p.nome || p.name, 
      
      // Corrigido: Garantimos que a URL da imagem é passada corretamente
      imageUrl: p.imageUrl, 
      
      // Os dados de aparição são importantes para o modal (mesmo que venham vazios/nulos)
      filmes: p.filmes || p.films,
      tvShows: p.tvShows,
      
      // Mantém o ID e todas as outras propriedades
      ...p
  }));


  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
      
      {/* CABEÇALHO E BARRA DE BUSCA */}
      <Box sx={{ my: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2, 
            mb: 2
          }}
        >
          <Box 
            component="img"
            sx={{ 
              height: 100, 
            }}
            alt="Disney Logo"
            src={logo}
          />
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ color: '#1976D2' }}
          >
            Enciclopédia Mágica Disney
          </Typography>
        </Box>
        <SearchBar />
      </Box>

      {/* FEEDBACK DE CARREGAMENTO E ERROS */}
      {carregando && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {erro && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {erro}
        </Alert>
      )}

      {/* GRID DE CARDS */}
      {!carregando && !erro && charactersData.length > 0 && (
        <Grid container spacing={4} justifyContent="center" key={gridKey}>
          {/* Usa o array mapeado charactersData */}
          {charactersData.map((personagem, index) => (
            <Grid 
              item 
              xs={12} sm={6} md={4} lg={3} 
              key={personagem._id}
              sx={{ display: 'flex', justifyContent: 'center' }}
              className="character-entry" 
              style={{ animationDelay: `${index * 0.05}s` }} 
            >
              <CharacterCard 
                // CORREÇÃO FINAL: Passamos a chave 'nome' e a chave 'imageUrl' mapeadas.
                nome={personagem.nome} 
                imageUrl={personagem.imageUrl} 
                onClick={() => handleCardClick(personagem)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* MENSAGEM DE NENHUM ENCONTRADO */}
      {!carregando && !erro && charactersData.length === 0 && (
         <Alert severity="info" sx={{ mt: 4 }}>
            Nenhum personagem encontrado.
         </Alert>
       )}

      {/* MODAL DE DETALHES */}
      <CharacterDetailsModal 
          character={selectedCharacter}
          open={isModalOpen}
          onClose={handleModalClose}
      />
    </Container>
  );
}

export default DashboardPage;