import React from 'react';
import { motion } from 'framer-motion';
import { 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  useMediaQuery, 
  Card,
  CardContent,
  Divider,
  useTheme
} from '@mui/material';
import '../index.css';

export default function PlayerSetup({
  emojiCategories,
  nameInputs,
  setNameInputs,
  handleCategorySelect,
  saveNames,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ 
          background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)', 
          p: 3,
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Blink Tac Toe
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '100%' }} className="space-y-6">
          {[0, 1].map(i => (
            <motion.div key={i} variants={itemVariants}>
              <Card 
                elevation={2} 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: i === 0 ? '#8b5cf6' : '#3b82f6',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center', 
                        width: 32, 
                        height: 32,
                        mr: 1.5,
                        borderRadius: '50%',
                        backgroundColor: i === 0 ? '#8b5cf6' : '#3b82f6',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {i+1}
                    </Box>
                    Player {i + 1}
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Player Name"
                    placeholder={`Enter name for Player ${i + 1}`}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{ mb: 3 }}
                    value={nameInputs[i]}
                    onChange={e => {
                      const newNames = [...nameInputs];
                      newNames[i] = e.target.value;
                      setNameInputs(newNames);
                    }}
                    InputProps={{
                      sx: { borderRadius: 2 }
                    }}
                  />
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography 
                    variant="subtitle2" 
                    sx={{ mb: 1.5, fontWeight: 500, color: 'text.secondary' }}
                  >
                    Choose emoji category:
                  </Typography>
                  
                  <Grid container spacing={1}>
                    {Object.entries(emojiCategories).map(([key, emojis]) => {
                      const isSelected = key === nameInputs[i];
                      return (
                        <Grid item xs={6} sm={4} key={key}>
                          <Button
                            variant={isSelected ? "contained" : "outlined"}
                            color={i === 0 ? "primary" : "secondary"}
                            onClick={() => handleCategorySelect(i, key)}
                            fullWidth
                            sx={{
                              borderRadius: 2,
                              height: '100%',
                              p: 1,
                              textTransform: 'none',
                              borderWidth: isSelected ? 0 : 1,
                              backgroundColor: isSelected 
                                ? i === 0 ? 'primary.main' : 'secondary.main' 
                                : 'transparent',
                              '&:hover': {
                                backgroundColor: isSelected 
                                  ? i === 0 ? 'primary.dark' : 'secondary.dark' 
                                  : 'rgba(0,0,0,0.04)'
                              }
                            }}
                          >
                            <Box sx={{ textAlign: 'center', width: '100%' }}>
                              <Typography 
                                variant="caption" 
                                display="block" 
                                sx={{ mb: 0.5, color: isSelected ? 'white' : 'inherit' }}
                              >
                                {key}
                              </Typography>
                              <Box sx={{ fontSize: '1.2rem', lineHeight: 1.5 }}>
                                {emojis.slice(0, 3).join(' ')}
                              </Box>
                            </Box>
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={saveNames}
              size="large"
              sx={{
                py: 2,
                borderRadius: 3,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)',
                },
              }}
            >
              Start Game
            </Button>
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
}