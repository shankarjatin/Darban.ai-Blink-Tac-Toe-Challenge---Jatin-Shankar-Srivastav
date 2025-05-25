import React from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import '../index.css';

export default function HelpModal({ onClose }) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        How to Play Blink Tac Toe
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Game Rules
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Box>
          
          <Box component="ul" className="pl-6 space-y-3">
            <Box component="li">
              <Typography variant="body1">
                <strong>Board Structure:</strong> 3x3 grid with a maximum of 6 emojis (3 per player)
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Emoji Categories:</strong> Each player chooses one category. Random emojis from that category appear on each turn.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Turn-Based Play:</strong> Players take turns placing emojis on any empty cell.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Vanishing Rule:</strong> Only 3 emojis per player allowed. The oldest emoji disappears when placing a 4th one. Cannot place a new emoji where the oldest one just vanished.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Winning:</strong> Form a line of 3 of your own emojis horizontally, vertically, or diagonally.
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="contained"
          sx={{ px: 4 }}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}