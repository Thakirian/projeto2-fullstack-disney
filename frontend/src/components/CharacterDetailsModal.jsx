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

const AppearanceList = ({ title, items, color }) => (
    <Box sx={{ mt: 2 }}>
        <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
        >
            {title} ({items.length}):
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {items.length > 0 ? (
                items.map((item, index) => (
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

function CharacterDetailsModal({ character, open, onClose }) {
  if (!character) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" component="h2" sx={{ mb: 1, color: 'primary.main', fontWeight: 800 }}>
          {character.name}
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
                alt={character.name}
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
                    items={character.films || []} 
                    color="primary"
                />

                <AppearanceList 
                    title="Séries de TV" 
                    items={character.tvShows || []} 
                    color="secondary" 
                />
                
                <AppearanceList 
                    title="Curtas-Metragens" 
                    items={character.shortFilms || []} 
                    color="primary"
                />
            </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default CharacterDetailsModal;