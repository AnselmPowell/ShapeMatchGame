import { useState } from 'react';
import { 
  createEmptyGrid, 
  createRandomBox, 
  createBlockerBox, 
  convertCustomBoard 
} from '../utils/gridUtils';
import { applyGravity } from '../utils/gameLogicUtils';
import { GAME_CONFIG, CUSTOM_BOARDS } from '../utils/gameConstants';

/**
 * Generate a random grid with random blockers and boxes
 */
const generateRandomGrid = () => {
  const grid = createEmptyGrid();
  
  // Place blocker boxes randomly (6-10 blockers)
  const numBlockers = GAME_CONFIG.MIN_BLOCKERS + 
    Math.floor(Math.random() * (GAME_CONFIG.MAX_BLOCKERS - GAME_CONFIG.MIN_BLOCKERS + 1));
    
  for (let i = 0; i < numBlockers; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * GRID_CONFIG.ROWS);
      col = Math.floor(Math.random() * GRID_CONFIG.COLS);
    } while (grid[row][col] !== null);
    grid[row][col] = createBlockerBox();
  }
  
  // Place moveable boxes in upper rows (16-20 boxes)
  const numBoxes = GAME_CONFIG.MIN_BOXES + 
    Math.floor(Math.random() * (GAME_CONFIG.MAX_BOXES - GAME_CONFIG.MIN_BOXES + 1));
    
  for (let i = 0; i < numBoxes; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * GAME_CONFIG.SPAWN_ROWS); // Top 5 rows only
      col = Math.floor(Math.random() * GRID_CONFIG.COLS);
    } while (grid[row][col] !== null);
    grid[row][col] = createRandomBox();
  }
  
  return applyGravity(grid);
};

/**
 * Initialize a new game grid based on current mode
 */
const initializeGrid = (boardMode, currentBoardIndex) => {
  if (boardMode === 'custom' && CUSTOM_BOARDS[currentBoardIndex]) {
    const customGrid = convertCustomBoard(CUSTOM_BOARDS[currentBoardIndex]);
    return applyGravity(customGrid);
  } else {
    return generateRandomGrid();
  }
};

/**
 * Centralized game state management hook
 */
export const useGameState = () => {
  // Board management state
  const [boardMode, setBoardMode] = useState('custom'); // 'custom' or 'random'
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  
  // Core game state
  const [grid, setGrid] = useState(() => initializeGrid('custom', 0));
  const [selectedBox, setSelectedBox] = useState(null);
  const [moves, setMoves] = useState(0);
  
  // Animation state
  const [matchingBoxes, setMatchingBoxes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fallingBoxes, setFallingBoxes] = useState([]);
  const [isGravityAnimating, setIsGravityAnimating] = useState(false);
  
  // Board management functions
  const toggleBoardMode = () => {
    const newMode = boardMode === 'custom' ? 'random' : 'custom';
    setBoardMode(newMode);
    setCurrentBoardIndex(0); // Reset to first board when switching modes
    const newGrid = initializeGrid(newMode, 0);
    setGrid(newGrid);
    resetGameState();
  };
  
  const nextBoard = () => {
    if (boardMode === 'custom') {
      const nextIndex = (currentBoardIndex + 1) % CUSTOM_BOARDS.length;
      setCurrentBoardIndex(nextIndex);
      const newGrid = initializeGrid('custom', nextIndex);
      setGrid(newGrid);
      resetGameState();
    }
  };
  
  const resetGameState = () => {
    setSelectedBox(null);
    setMoves(0);
    setMatchingBoxes([]);
    setIsAnimating(false);
    setFallingBoxes([]);
    setIsGravityAnimating(false);
  };
  
  // Reset game to initial state
  const resetGame = () => {
    const newGrid = initializeGrid(boardMode, currentBoardIndex);
    setGrid(newGrid);
    resetGameState();
  };
  
  return {
    // Core state
    grid,
    setGrid,
    selectedBox,
    setSelectedBox,
    moves,
    setMoves,
    
    // Animation state
    matchingBoxes,
    setMatchingBoxes,
    isAnimating,
    setIsAnimating,
    fallingBoxes,
    setFallingBoxes,
    isGravityAnimating,
    setIsGravityAnimating,
    
    // Board management state
    boardMode,
    currentBoardIndex,
    totalBoards: CUSTOM_BOARDS.length,
    
    // Actions
    resetGame,
    toggleBoardMode,
    nextBoard
  };
};
