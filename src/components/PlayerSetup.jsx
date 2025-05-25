import React from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Box, Paper, Typography, Grid, Chip } from '@mui/material';
import '../index.css';

export default function PlayerSetup({
  emojiCategories,
  nameInputs,
  setNameInputs,
  handleCategorySelect,
  saveNames,
}) {
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
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {[0, 1].map(i => (
        <motion.div key={i} variants={itemVariants}>
          <Paper elevation={2} className="p-5 rounded-lg">
            <Typography variant="h6" className="font-semibold mb-3">
              Player {i + 1}
            </Typography>
            
            <TextField
              fullWidth
              label={`Player ${i + 1} Name`}
              placeholder={`Enter name for Player ${i + 1}`}
              variant="outlined"
              size="medium"
              className="mb-4"
              value={nameInputs[i]}
              onChange={e => {
                const newNames = [...nameInputs];
                newNames[i] = e.target.value;
                setNameInputs(newNames);
              }}
            />
            
            <Typography variant="body2" className="mb-3 font-medium">
              Choose emoji category:
            </Typography>
            
            <Grid container spacing={1.5}>
              {Object.entries(emojiCategories).map(([key, emojis]) => (
                <Grid item key={key}>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => handleCategorySelect(i, key)}
                    className="normal-case"
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                    }}
                  >
                    <Box>
                      <Typography variant="caption" display="block">
                        {key}
                      </Typography>
                      <Typography>
                        {emojis.slice(0, 3).join(' ')}
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
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
            py: 1.5,
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'none',
          }}
        >
          Start Game
        </Button>
      </motion.div>
    </motion.div>
  );
}