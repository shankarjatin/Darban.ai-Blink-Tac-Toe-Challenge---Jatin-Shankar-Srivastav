import React, { useState } from 'react';
import Board from './components/Board';
import HelpModal from './components/HelpModal';
import PlayerSetup from './components/PlayerSetup';
import ScoreBoard from './components/ScoreBoard';
import { Snackbar, Alert, IconButton, Tooltip, Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './App.css';
import './index.css';

const emojiCategories = {
  Animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐼'],
  Food: ['🍕', '🍟', '🍔', '🍩', '🍦', '🍫'],
  Sports: ['⚽️', '🏀', '🏈', '🎾', '🏐', '⚾️'],
  Plants: ['🌵', '🌴', '🌲', '🌸', '🌹', '🍄'],
  Weather: ['☀️', '☁️', '⛈️', '❄️', '🌈', '⭐'],
  Vehicles: ['🚗', '🚕', '🚂', '✈️', '🚁', '🚢'],
  Faces: ['😀', '😂', '😍', '😎', '😭', '😡'], // New category
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
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [drawCount, setDrawCount] = useState(0);

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
        setNotification({
          open: true,
          message: 'Cannot place emoji on the same spot where one just vanished!',
          severity: 'warning'
        });
        return;
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
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
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

        import('canvas-confetti').then(confettiModule => {
          const confetti = confettiModule.default;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        });

        setNotification({
          open: true,
          message: `${names[playerIndex]} wins the game!`,
          severity: 'success'
        });

        return;
      }
    }

    // Draw detection
    if (newBoard.filter(Boolean).length === 9) {
      setDrawCount(drawCount + 1);
      setWinner('Draw');
      setNotification({
        open: true,
        message: `It's a draw!`,
        severity: 'info'
      });
      return;
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

  // Settings dialog for toggling dark mode and resetting scores
  const handleToggleDarkMode = () => setDarkMode(!darkMode);
  const handleResetScores = () => {
    setScores([0, 0]);
    setDrawCount(0);
    setNotification({
      open: true,
      message: 'Scores reset!',
      severity: 'info'
    });
    setShowSettings(false);
  };

  // Setup screen
  if (!categories.every(Boolean) || !nameInputs.every(Boolean) || names[0] === 'Player 1') {
    return (
      <div className={darkMode ? "w-full bg-gray-900 min-h-screen text-white" : "w-full"}>
        <div className="flex justify-end p-2">
          <Tooltip title="Settings">
            <IconButton onClick={() => setShowSettings(true)} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={handleToggleDarkMode} color="inherit">
              {darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
        </div>
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
        <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <div className="flex items-center gap-2">
              <NightsStayIcon />
              <Switch checked={darkMode} onChange={handleToggleDarkMode} />
              <WbSunnyIcon />
              <span>{darkMode ? "Dark" : "Light"} Mode</span>
            </div>
            <Button onClick={handleResetScores} color="secondary" variant="outlined" sx={{ mt: 2 }}>
              Reset Scores
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSettings(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={darkMode ? "w-full bg-gray-900 min-h-screen text-white p-4 md:p-6 rounded-lg shadow-lg" : "w-full bg-white p-4 md:p-6 rounded-lg shadow-lg"}>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-center" style={{ color: darkMode ? "#a78bfa" : "#6d28d9" }}>
          Blink Tac Toe
        </h1>
        <div>
          <Tooltip title="Settings">
            <IconButton onClick={() => setShowSettings(true)} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={handleToggleDarkMode} color="inherit">
              {darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <ScoreBoard
        names={names}
        scores={scores}
        turn={turn}
        gameOver={!!winner}
        winner={winner}
        onHelp={() => setShowHelp(true)}
        drawCount={drawCount}
        darkMode={darkMode}
      />
      <Board
        board={board}
        handleCellClick={handleCellClick}
        gameOver={!!winner}
        resetGame={resetGame}
        winningLine={winningLine}
        darkMode={darkMode}
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
      <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <div className="flex items-center gap-2">
            <NightsStayIcon />
            <Switch checked={darkMode} onChange={handleToggleDarkMode} />
            <WbSunnyIcon />
            <span>{darkMode ? "Dark" : "Light"} Mode</span>
          </div>
          <Button onClick={handleResetScores} color="secondary" variant="outlined" sx={{ mt: 2 }}>
            Reset Scores
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}