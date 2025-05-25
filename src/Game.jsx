import React, { useState } from 'react';
import Board from './components/Board';
import HelpModal from './components/HelpModal';
import PlayerSetup from './components/PlayerSetup';
import ScoreBoard from './components/ScoreBoard';
import { Snackbar, Alert } from '@mui/material';
import './App.css';
import './index.css';

const emojiCategories = {
  Animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐼'],
  Food: ['🍕', '🍟', '🍔', '🍩', '🍦', '🍫'],
  Sports: ['⚽️', '🏀', '🏈', '🎾', '🏐', '⚾️'],
  Plants: ['🌵', '🌴', '🌲', '🌸', '🌹', '🍄'],
  Weather: ['☀️', '☁️', '⛈️', '❄️', '🌈', '⭐'],
  Vehicles: ['🚗', '🚕', '🚂', '✈️', '🚁', '🚢']
};

export default function Game() {
  const [names, setNames] = useState(['Player 1', 'Player 2']);
  const [nameInputs, setNameInputs] = useState(['', '']);
  const [categories, setCategories] = useState([null, null]);
  const [chosenEmojis, setChosenEmojis] = useState([[], []]);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(0);
  const [positions, setPositions] = useState([[], []]); // FIFO positions
  const [scores, setScores] = useState([0, 0]);
  const [winner, setWinner] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [winningLine, setWinningLine] = useState(null);

  const handleCategorySelect = (playerIndex, category) => {
    const updated = [...categories];
    updated[playerIndex] = category;
    setCategories(updated);
    
    setNotification({
      open: true,
      message: `Player ${playerIndex + 1} selected ${category} emojis!`,
      severity: 'success'
    });
  };

  const saveNames = () => {
    if (categories.every(Boolean) && nameInputs.every(Boolean)) {
      setNames(nameInputs);
      setShowHelp(true); // Show help modal when game starts
    } else {
      setNotification({
        open: true,
        message: 'Please enter names and choose categories for both players.',
        severity: 'error'
      });
    }
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || !categories.every(Boolean)) return;

    const playerIndex = turn % 2;
    const currentCategory = emojiCategories[categories[playerIndex]];
    const randomEmoji = currentCategory[Math.floor(Math.random() * currentCategory.length)];

    let newBoard = [...board];
    let newPositions = [...positions];
    let newChosen = [...chosenEmojis];

    // Vanishing Rule
    if (newPositions[playerIndex].length === 3) {
      const removedIndex = newPositions[playerIndex][0];
      newBoard[removedIndex] = null;
      newPositions[playerIndex] = newPositions[playerIndex].slice(1);
      newChosen[playerIndex] = newChosen[playerIndex].slice(1);

      setNotification({
        open: true,
        message: `${names[playerIndex]}'s oldest emoji vanished!`,
        severity: 'info'
      });

      if (removedIndex === index) {
        // Cannot place emoji where the oldest one was just removed
        setNotification({
          open: true,
          message: 'Cannot place emoji on the same spot where one just vanished!',
          severity: 'warning'
        });
        return; // Exit the function without making any changes
      }
    }

    newBoard[index] = randomEmoji;
    newPositions[playerIndex].push(index);
    newChosen[playerIndex].push(randomEmoji);

    setBoard(newBoard);
    setPositions(newPositions);
    setChosenEmojis(newChosen);

    // Check for winner
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],            // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        newBoard[a] &&
        newPositions[playerIndex].includes(a) &&
        newPositions[playerIndex].includes(b) &&
        newPositions[playerIndex].includes(c)
      ) {
        const updatedScores = [...scores];
        updatedScores[playerIndex]++;
        setScores(updatedScores);
        setWinner(names[playerIndex]);
        setWinningLine(line);
        
        setNotification({
          open: true,
          message: `${names[playerIndex]} wins the game!`,
          severity: 'success'
        });
        
        return;
      }
    }

    setTurn(turn + 1);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPositions([[], []]);
    setChosenEmojis([[], []]);
    setWinner(null);
    setWinningLine(null);
    setTurn(0);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (!categories.every(Boolean) || !nameInputs.every(Boolean) || names[0] === 'Player 1') {
    return (
  <div className="bg-white p-6 rounded-lg shadow-lg w-full">
    <h1 className="text-2xl font-bold mb-6 text-center text-white bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg">
          Blink Tac Toe
        </h1>
        <PlayerSetup
          emojiCategories={emojiCategories}
          nameInputs={nameInputs}
          setNameInputs={setNameInputs}
          handleCategorySelect={handleCategorySelect}
          saveNames={saveNames}
        />
        
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  return (
   <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-center text-purple-800 mb-4">
        Blink Tac Toe
      </h1>
      <ScoreBoard
        names={names}
        scores={scores}
        turn={turn}
        gameOver={!!winner}
        winner={winner}
        onHelp={() => setShowHelp(true)}
      />
      <Board
        board={board}
        handleCellClick={handleCellClick}
        gameOver={!!winner}
        resetGame={resetGame}
        winningLine={winningLine}
      />
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}