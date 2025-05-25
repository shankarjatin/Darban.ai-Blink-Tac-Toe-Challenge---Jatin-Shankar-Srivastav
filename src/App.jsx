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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
        {/* Use md for medium devices, giving more width */}
        <Container 
          className="py-6" 
          maxWidth="md"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="w-full max-w-2xl"> {/* Increased max width */}
            <Game />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;