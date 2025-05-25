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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
        <Container maxWidth="md" className="py-8">
          <Game />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;