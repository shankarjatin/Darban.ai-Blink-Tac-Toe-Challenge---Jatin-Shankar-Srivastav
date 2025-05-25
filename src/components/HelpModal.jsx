import React from 'react';

export default function HelpModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">How to Play</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Choose emoji categories and enter player names.</li>
          <li>Each player takes turns placing their emoji on the grid.</li>
          <li>Only 3 emojis per player can exist at a time. The oldest one vanishes.</li>
          <li>A player wins by aligning 3 of their own emojis horizontally, vertically, or diagonally.</li>
          <li>Click "Play Again" to restart after a win.</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
