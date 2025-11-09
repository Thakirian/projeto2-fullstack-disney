import React, { useContext } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear'; 
import { SearchContext } from '../contexts/SearchContext';

function SearchBar() { 
  const { termoBusca, setTermoBusca, buscarPersonagens } = useContext(SearchContext);

  const handleSearch = () => {
    buscarPersonagens(termoBusca.trim());
  };

  const handleClear = () => {
    setTermoBusca('');
    buscarPersonagens('');
  };

  const handleKeyDown = (evento) => {
    if (evento.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (evento) => {
    const termo = evento.target.value;
    setTermoBusca(termo);

    if (termo === '') {
      buscarPersonagens('');
    }
  };

  return (
    <Box 
      component="form"
      onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 2,
        p: 2, 
        width: '100%', 
        maxWidth: 750, 
      }}
    >
      <TextField
        label="Buscar por personagem..."
        variant="outlined"
        value={termoBusca}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        sx={{ width: '100%' }} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            termoBusca && (
                <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end">
                        <ClearIcon />
                    </IconButton>
                </InputAdornment>
            )
          ),
          sx: {
            borderRadius: 30,
            transition: 'box-shadow 0.3s',
            '&.Mui-focused': {
                boxShadow: '0 0 10px #FFC107',
            },
          }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ 
          backgroundColor: '#1976D2',
          padding: '14px 24px', 
        }}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;