import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import CharacterDetailsModal from './components/CharacterDetailsModal';
import { SearchContext } from './contexts/SearchContext';
import logo from './image/logo.png';
import './App.css';

function App() {
  const { personagens, carregando, erro, buscarPersonagens } = useContext(SearchContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    if (personagens.length === 0 && !erro) {
       buscarPersonagens(''); 
    }
  }, [buscarPersonagens, personagens.length, erro]); 

  const handleCardClick = (character) => {
      setSelectedCharacter(character);
      setIsModalOpen(true);
  };

  const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedCharacter(null); 
  };
  
  const gridKey = carregando ? 'loading' : 'loaded-' + personagens.length; 

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
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

      {!carregando && !erro && personagens.length > 0 && (
        <Grid container spacing={4} justifyContent="center" key={gridKey}>
          {personagens.map((personagem, index) => (
            <Grid 
              item 
              xs={12} sm={6} md={4} lg={3} 
              key={personagem._id}
              sx={{ display: 'flex', justifyContent: 'center' }}
              className="character-entry" 
              style={{ animationDelay: `${index * 0.05}s` }} 
            >
              <CharacterCard 
                name={personagem.name} 
                imageUrl={personagem.imageUrl} 
                onClick={() => handleCardClick(personagem)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!carregando && !erro && personagens.length === 0 && (
         <Alert severity="info" sx={{ mt: 4 }}>
            Nenhum personagem encontrado.
         </Alert>
       )}

      <CharacterDetailsModal 
          character={selectedCharacter}
          open={isModalOpen}
          onClose={handleModalClose}
      />
    </Container>
  );
}

export default App;