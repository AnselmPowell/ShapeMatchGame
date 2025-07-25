import { useState } from 'react';
import { createEmptyGrid, createRandomBox, createBlockerBox } from '../utils/gridUtils';
import { applyGravity } from '../utils/gameLogicUtils';
import { GAME_CONFIG } from '../utils/gameConstants';

/**
 * Initialize a new game grid with random blockers and boxes
 */
const initializeGrid = () => {
  const grid = createEmptyGrid();
  
  // Place blocker boxes randomly (6-10 blockers)
  const numBlockers = GAME_CONFIG.MIN_BLOCKERS + 
    Math.floor(Math.random() * (GAME_CONFIG.MAX_BLOCKERS - GAME_CONFIG.MIN_BLOCKERS + 1));
    
  for (let i = 0; i < numBlockers; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * 8);
      col = Math.floor(Math.random() * 10);
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
      col = Math.floor(Math.random() * 10);
    } while (grid[row][col] !== null);
    grid[row][col] = createRandomBox();
  }
  
  // Apply gravity to settle everything
  return applyGravity(grid);
};

/**
 * Centralized game state management hook
 */
export const useGameState = () => {
  // Core game state
  const [grid, setGrid] = useState(() => initializeGrid());
  const [selectedBox, setSelectedBox] = useState(null);
  const [moves, setMoves] = useState(0);
  
  // Animation state
  const [matchingBoxes, setMatchingBoxes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fallingBoxes, setFallingBoxes] = useState([]);
  const [isGravityAnimating, setIsGravityAnimating] = useState(false);
  
  // Reset game to initial state
  const resetGame = () => {
    setGrid(initializeGrid());
    setSelectedBox(null);
    setMoves(0);
    setMatchingBoxes([]);
    setIsAnimating(false);
    setFallingBoxes([]);
    setIsGravityAnimating(false);
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
    
    // Actions
    resetGame
  };
};
