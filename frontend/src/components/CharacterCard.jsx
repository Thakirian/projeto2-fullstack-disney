import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

function CharacterCard({ imageUrl, name, onClick }) { 
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
          image={imageUrl}
          alt={name}
          sx={{ objectFit: 'cover' }}
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
            {name}
          </Typography>
        </CardContent>
    </Card>
  );
}

export default CharacterCard;