import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Board({ board, handleCellClick, gameOver, resetGame, winningLine }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={gameOver}
            className={`w-24 h-24 text-4xl flex items-center justify-center bg-white rounded-lg shadow-md transition-all
              ${winningLine && winningLine.includes(index) 
                ? 'bg-yellow-200 shadow-lg ring-2 ring-yellow-500' 
                : 'hover:bg-gray-50 active:bg-gray-100'}`}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {cell ? (
                <motion.span
                  key={`${index}-${cell}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {cell}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      
      {gameOver && (
        <motion.button
          onClick={resetGame}
          className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:opacity-90 font-semibold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Play Again
        </motion.button>
      )}
    </div>
  );
}