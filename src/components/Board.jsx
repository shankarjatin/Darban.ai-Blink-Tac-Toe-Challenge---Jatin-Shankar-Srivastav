import React from 'react';

export default function Board({ board, handleCellClick, gameOver, resetGame }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className="w-24 h-24 text-3xl flex items-center justify-center bg-white rounded-lg shadow hover:bg-gray-50 transition-all"
          >
            {cell}
          </button>
        ))}
      </div>
      {gameOver && (
        <button
          onClick={resetGame}
          className="w-full mt-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
