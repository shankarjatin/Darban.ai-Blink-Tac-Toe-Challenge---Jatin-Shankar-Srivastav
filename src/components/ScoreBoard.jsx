import React from 'react';
import { motion } from 'framer-motion';
import { Box, Paper, Typography, Button, Chip, Badge, Avatar, useMediaQuery, useTheme } from '@mui/material';
import '../index.css';

export default function ScoreBoard({ names, scores, turn, gameOver, winner, onHelp }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: { xs: 2, sm: 3 }, 
        borderRadius: 3,
        background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          width: isMobile ? '100%' : 'auto'
        }}>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Scoreboard
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            gap: 3,
            justifyContent: isMobile ? 'center' : 'flex-start',
            width: '100%'
          }}>
            {[0, 1].map((i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: turn % 2 === i && !gameOver ? 
                    i === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
                    : 'transparent',
                  border: turn % 2 === i && !gameOver ? 
                    `1px solid ${i === 0 ? '#8b5cf6' : '#10b981'}` 
                    : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  flex: isMobile ? '1' : '0',
                  minWidth: isMobile ? '0' : '100px'
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
                    maxWidth: '100%'
                  }}
                >
                  {names[i]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: isMobile ? 'center' : 'flex-end',
          justifyContent: 'space-between',
          width: isMobile ? '100%' : 'auto',
          mt: isMobile ? 1 : 0
        }}>
          {gameOver ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ flex: isMobile ? '1' : 'auto' }}
            >
              <Chip
                label={`${winner} Wins!`}
                color="success"
                sx={{ 
                  fontWeight: 'bold',
                  py: 1.5,
                  background: 'linear-gradient(to right, #10b981, #059669)',
                  width: isMobile ? '100%' : 'auto',
                }}
              />
            </motion.div>
          ) : (
            <Box sx={{ 
              flex: isMobile ? '1' : 'auto', 
              display: 'flex', 
              justifyContent: isMobile ? 'center' : 'flex-end',
              width: isMobile ? '100%' : 'auto'
            }}>
              <Chip
                label={`${names[turn % 2]}'s turn`}
                color={turn % 2 === 0 ? "primary" : "secondary"}
                variant="filled"
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  fontWeight: 'medium',
                  width: isMobile ? '100%' : 'auto'
                }}
              />
            </Box>
          )}
          
          <Button
            onClick={onHelp}
            color="info"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              mt: isMobile ? 0 : 2,
              ml: isMobile ? 2 : 0,
              transition: 'all 0.2s',
              borderRadius: 2,
              minWidth: isMobile ? '80px' : '100px',
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