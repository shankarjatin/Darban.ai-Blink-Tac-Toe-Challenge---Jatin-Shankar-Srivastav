import React from 'react';
import { motion } from 'framer-motion';
import { Box, Paper, Typography, Button, Chip } from '@mui/material';
// Change the following line:
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// To this:

import '../index.css';

export default function ScoreBoard({ names, scores, turn, gameOver, winner, onHelp }) {
  return (
    <Paper elevation={2} className="p-4 rounded-lg">
      <Box className="flex justify-between items-center">
        <Box className="space-y-1">
          <Box className="flex items-center gap-2">
            <Typography variant="subtitle1" className="font-semibold">
              {names[0]}:
            </Typography>
            <Typography variant="subtitle1" className="font-bold text-purple-700">
              {scores[0]}
            </Typography>
          </Box>
          <Box className="flex items-center gap-2">
            <Typography variant="subtitle1" className="font-semibold">
              {names[1]}:
            </Typography>
            <Typography variant="subtitle1" className="font-bold text-blue-700">
              {scores[1]}
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-col items-end">
          {gameOver ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Chip
                label={`${winner} Wins!`}
                color="success"
                size="medium"
                className="font-bold"
              />
            </motion.div>
          ) : (
            <Chip
              label={`${names[turn % 2]}'s turn`}
              color={turn % 2 === 0 ? "primary" : "secondary"}
              size="small"
              variant="outlined"
            />
          )}
          
       <Button
  onClick={onHelp}
  size="small"
  color="info"
  className="mt-2"
>
  ? Help
</Button>
        </Box>
      </Box>
    </Paper>
  );
}