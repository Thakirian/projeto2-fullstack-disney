import { createTheme } from '@mui/material/styles';

const disneyTheme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', 
    },
    secondary: {
      main: '#FFC107',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', 
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 800,
      color: '#1976D2',
      textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
    },
    h6: {
      color: '#1976D2',
      fontWeight: 600,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFC107',
            boxShadow: '0 0 10px #FFC107',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          boxShadow: '0 6px 15px rgba(25, 118, 210, 0.4)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(255, 193, 7, 0.6)',
            backgroundColor: '#FFC107', 
            color: '#1976D2',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.04)',
            boxShadow: '0 12px 25px rgba(25, 118, 210, 0.25)',
          },
        },
      },
    },
  },
});

export default disneyTheme;