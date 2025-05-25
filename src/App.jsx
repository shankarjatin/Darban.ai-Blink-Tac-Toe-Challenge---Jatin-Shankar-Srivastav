import React from 'react';
import Game from './Game';
import { Container, ThemeProvider, createTheme } from '@mui/material';

// Create a theme with Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b5cf6', // Purple
    },
    secondary: {
      main: '#10b981', // Emerald
    },
  },
  // Add responsive breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-2">
        {/* Change maxWidth to "sm" for mobile and larger for desktop */}
        <Container 
          className="py-4" 
          maxWidth="sm"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="w-full max-w-md"> {/* Ensure the game has a max width but can grow */}
            <Game />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;