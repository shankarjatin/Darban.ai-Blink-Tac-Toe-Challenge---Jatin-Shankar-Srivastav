import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paper, Box, Button, useMediaQuery, useTheme } from '@mui/material';

export default function Board({ board, handleCellClick, gameOver, resetGame, winningLine }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const clickSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);

  // Initialize sounds
  useEffect(() => {
    try {
      // Create Audio elements
      clickSoundRef.current = new Audio('/sounds/pop.mp3');
      winSoundRef.current = new Audio('/sounds/win.mp3');
      hoverSoundRef.current = new Audio('/sounds/hover.mp3');
      hoverSoundRef.current.volume = 0.2;
    } catch (error) {
      console.error("Sound initialization failed:", error);
    }
    
    // Clean up
    return () => {
      [clickSoundRef, winSoundRef, hoverSoundRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, []);

  // Play win sound when game is over
  useEffect(() => {
    if (gameOver && winSoundRef.current) {
      try {
        winSoundRef.current.play();
      } catch (error) {
        console.error("Error playing win sound:", error);
      }
    }
  }, [gameOver]);

  // Handle cell click with sound
  const handleCellWithSound = (index) => {
    if (!gameOver && !board[index] && clickSoundRef.current) {
      try {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play();
      } catch (error) {
        console.error("Error playing click sound:", error);
      }
    }
    handleCellClick(index);
  };

  // Handle hover sound
  const handleHover = () => {
    if (hoverSoundRef.current && !isMobile) {
      try {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play();
      } catch (error) {
        console.error("Error playing hover sound:", error);
      }
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            onClick={() => handleCellWithSound(index)}
            onMouseEnter={handleHover}
            disabled={gameOver || board[index] !== null}
            className={`aspect-square w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex items-center justify-center rounded-xl transition-all
              ${winningLine && winningLine.includes(index) 
                ? 'bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-lg ring-2 ring-yellow-500' 
                : 'bg-white hover:bg-gray-50 active:bg-gray-100'}`}
            style={{
              boxShadow: winningLine && winningLine.includes(index)
                ? '0 0 15px rgba(250, 204, 21, 0.6)'
                : '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
            whileHover={{ 
              scale: board[index] || isMobile ? 1 : 1.03,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <AnimatePresence mode="wait">
              {cell && (
                <motion.span
                  key={`${index}-${cell}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1.2,
                    rotate: 0,
                  }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.5
                  }}
                  className="drop-shadow-md"
                  style={{
                    textShadow: winningLine && winningLine.includes(index) 
                      ? '0 0 8px rgba(0, 0, 0, 0.3)' 
                      : 'none'
                  }}
                >
                  {cell}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      
      {gameOver && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-6"
        >
          <motion.button
            onClick={resetGame}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg font-semibold flex items-center justify-center"
            whileHover={{ 
              scale: isMobile ? 1 : 1.02,
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Play Again
          </motion.button>
          
          <Box className="text-center text-gray-500 text-sm mt-2">
            Winner gets to go first next game!
          </Box>
        </motion.div>
      )}
    </Paper>
  );
}