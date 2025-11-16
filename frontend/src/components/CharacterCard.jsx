// src/components/CharacterCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

// 1. Renomeamos a prop para 'nome' (como você já fez)
function CharacterCard({ imageUrl, nome, onClick }) { 

  // 2. Definimos nossa imagem reserva
  const placeholderImage = 'https://dummyimage.com/300x200/cccccc/000000.png&text=Disney';

  // 3. Verificação se a URL é um link http válido (nosso "Plano B")
  const finalImageUrl = (imageUrl && imageUrl.startsWith('http')) 
    ? imageUrl 
    : placeholderImage;
  
  // 4. Fallback para o nome
  const characterName = nome || "Nome Desconhecido"; 
    
  return (
    <Card 
      onClick={onClick} 
      sx={{ 
        width: 250, 
        height: 320, 
        m: 'auto', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer', 
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 25px rgba(25, 118, 210, 0.35)', 
        }
      }}
    >
        <CardMedia
          component="img"
          height="230" 
          image={finalImageUrl} // <-- 5. Usamos a URL segura
          alt={characterName} 
          sx={{ objectFit: 'cover' }}
          
          // 6. "Plano C": O paraquedas para links quebrados (404)
          onError={(e) => {
            e.target.onerror = null; // Previne loops infinitos
            e.target.src = placeholderImage; // Troca a imagem pelo placeholder
          }}
        />
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: 1,
            height: 80, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
          }}
        >
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            align="center"
            sx={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: 'primary.dark',
              overflow: 'hidden',       
              textOverflow: 'ellipsis', 
              display: '-webkit-box',   
              WebkitLineClamp: 4,       
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.2em',      
              maxHeight: '4.8em',       
            }}
          >
            {characterName} 
          </Typography>
        </CardContent>
    </Card>
  );
}

export default CharacterCard;