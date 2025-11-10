import React from 'react';
import { Modal, Box, Typography, Button, Chip, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: 600 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  outline: 'none',
};

// Componente auxiliar para renderizar listas com conversão de JSON otimizada
const AppearanceList = ({ title, items, color }) => {
    let parsedItems = [];
    
    // Tentativa de parse robusta
    if (typeof items === 'string' && items.trim().length > 0) {
        try {
            // Tenta converter a string JSON para um array
            const tempItems = JSON.parse(items);
            // Verifica se o resultado é um array antes de usar.
            parsedItems = Array.isArray(tempItems) ? tempItems : [];
        } catch (e) {
            // Se o JSON.parse falhar, assumimos que é um problema de formatação do banco
            console.error(`Erro ao fazer JSON.parse para ${title}:`, e);
            parsedItems = []; 
        }
    } else if (Array.isArray(items)) {
        // Se já for um array (melhor cenário), usa-o
        parsedItems = items;
    }

    // Filtra strings vazias que podem ter vindo do parse (ex: de um array ['a', ''])
    parsedItems = parsedItems.filter(item => item && String(item).trim().length > 0);

    return (
        <Box sx={{ mt: 2 }}>
            <Typography 
                variant="subtitle1" 
                sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
            >
                {title} ({parsedItems.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {parsedItems.length > 0 ? (
                    parsedItems.map((item, index) => (
                        <Chip 
                            key={index} 
                            label={item} 
                            color={color} 
                            size="small" 
                            variant="outlined" 
                            sx={{ borderColor: color === 'primary' ? 'primary.main' : 'secondary.main' }}
                        />
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">Nenhuma aparição listada.</Typography>
                )}
            </Box>
        </Box>
    );
};

function CharacterDetailsModal({ character, open, onClose }) {
  if (!character) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" component="h2" sx={{ mb: 1, color: 'primary.main', fontWeight: 800 }}>
          {character.nome}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Button 
          onClick={onClose} 
          sx={{ position: 'absolute', right: 8, top: 8, color: 'primary.main' }}
          size="small"
        >
          <CloseIcon />
        </Button>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Box 
                component="img"
                src={character.imageUrl}
                alt={character.nome}
                sx={{ 
                    width: { xs: '100%', sm: 200 }, 
                    height: { xs: 200, sm: 200 },
                    objectFit: 'cover',
                    borderRadius: 1,
                    boxShadow: 3
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.secondary">
                    Descubra em quais produções este personagem apareceu:
                </Typography>
                
                <AppearanceList 
                    title="Filmes de Longa-Metragem" 
                    items={character.filmes || []} 
                    color="primary"
                />

                <AppearanceList 
                    title="Séries de TV" 
                    items={character.tvShows || []} 
                    color="secondary" 
                />
            </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default CharacterDetailsModal;