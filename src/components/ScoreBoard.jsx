import React from 'react';
import { motion } from 'framer-motion';
import { Box, Paper, Typography, Button, Chip, Badge, IconButton, Divider, Avatar } from '@mui/material';
// Remove all icon imports
import '../index.css';

export default function ScoreBoard({ names, scores, turn, gameOver, winner, onHelp }) {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: 3, 
        borderRadius: 3,
        background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Scoreboard
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[0, 1].map((i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 2,
                  minWidth: 100,
                  backgroundColor: turn % 2 === i && !gameOver ? 
                    i === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
                    : 'transparent',
                  border: turn % 2 === i && !gameOver ? 
                    `1px solid ${i === 0 ? '#8b5cf6' : '#10b981'}` 
                    : '1px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: i === 0 ? '#8b5cf6' : '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        border: '2px solid white'
                      }}
                    >
                      {scores[i]}
                    </Box>
                  }
                >
                  <Avatar
                    sx={{ 
                      bgcolor: i === 0 ? 'primary.main' : 'secondary.main',
                      width: 40,
                      height: 40,
                      mb: 1
                    }}
                  >
                    {names[i].charAt(0).toUpperCase()}
                  </Avatar>
                </Badge>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: i === 0 ? 'primary.main' : 'secondary.main',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 120
                  }}
                >
                  {names[i]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {gameOver ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Chip
                // Remove icon prop
                label={`${winner} Wins!`}
                color="success"
                sx={{ 
                  fontWeight: 'bold',
                  px: 1,
                  py: 2.5,
                  background: 'linear-gradient(to right, #10b981, #059669)',
                }}
              />
            </motion.div>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Remove PsychologyIcon and just use text */}
              <Chip
                label={`${names[turn % 2]}'s turn`}
                color={turn % 2 === 0 ? "primary" : "secondary"}
                variant="filled"
                size="medium"
                sx={{ fontWeight: 'medium' }}
              />
            </Box>
          )}
          
          <Button
            // Replace IconButton with regular Button
            onClick={onHelp}
            color="info"
            variant="outlined"
            size="small"
            sx={{ 
              mt: { xs: 1, sm: 2 },
              transition: 'all 0.2s',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                transform: 'scale(1.05)'
              }
            }}
          >
            Help
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}