import { useState } from 'react';
import { 
  createEmptyGrid, 
  createRandomBox, 
  createBlockerBox, 
  convertCustomBoard 
} from '../utils/gridUtils';
import { applyGravity } from '../utils/gameLogicUtils';
import { GAME_CONFIG, CUSTOM_BOARDS, LEVEL_MOVE_LIMITS } from '../utils/gameConstants';

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
  const [moveLimit, setMoveLimit] = useState(LEVEL_MOVE_LIMITS[0]);
  const [isOutOfMoves, setIsOutOfMoves] = useState(false);
  const [previousGridState, setPreviousGridState] = useState(null);
  const [hasUsedUndo, setHasUsedUndo] = useState(false);
  
  // Animation state
  const [matchingBoxes, setMatchingBoxes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fallingBoxes, setFallingBoxes] = useState([]);
  const [isGravityAnimating, setIsGravityAnimating] = useState(false);
  const [teleportingBoxes, setTeleportingBoxes] = useState([]);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [portalEnterAnimation, setPortalEnterAnimation] = useState(false);
  const [portalConnectAnimation, setPortalConnectAnimation] = useState(false);
  const [portalExitAnimation, setPortalExitAnimation] = useState(false);
  const [activePortals, setActivePortals] = useState([]);
  
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
      setMoveLimit(LEVEL_MOVE_LIMITS[nextIndex]);
      const newGrid = initializeGrid('custom', nextIndex);
      setGrid(newGrid);
      resetGameState(); // This now includes resetting undo state
    }
  };
  
  const resetGameState = () => {
    setSelectedBox(null);
    setMoves(0);
    setIsOutOfMoves(false);
    setMatchingBoxes([]);
    setIsAnimating(false);
    setFallingBoxes([]);
    setIsGravityAnimating(false);
    
    // Reset undo state
    setHasUsedUndo(false);
    setPreviousGridState(null);
  };
  
  // Reset game to initial state
  const resetGame = () => {
    const newGrid = initializeGrid(boardMode, currentBoardIndex);
    setGrid(newGrid);
    setMoveLimit(LEVEL_MOVE_LIMITS[currentBoardIndex]);
    resetGameState(); // This now includes resetting undo state
  };
  
  // Undo the last move
  const undoLastMove = () => {
    // Check if undo is available
    if (hasUsedUndo || !previousGridState || isAnimating || isGravityAnimating) {
      return;
    }

    // Restore previous grid state
    setGrid(previousGridState);
    
    // Decrement move counter
    setMoves(prevMoves => Math.max(0, prevMoves - 1));
    
    // Mark undo as used
    setHasUsedUndo(true);
    
    // Clear selection if any
    setSelectedBox(null);
    
    // Reset animation states to be safe
    setMatchingBoxes([]);
    setFallingBoxes([]);
  };
  
  return {
    // Core state
    grid,
    setGrid,
    selectedBox,
    setSelectedBox,
    moves,
    setMoves,
    moveLimit,
    isOutOfMoves,
    setIsOutOfMoves,
    previousGridState,
    setPreviousGridState,
    hasUsedUndo,
    setHasUsedUndo,
    
    // Animation state
    matchingBoxes,
    setMatchingBoxes,
    isAnimating,
    setIsAnimating,
    fallingBoxes,
    setFallingBoxes,
    isGravityAnimating,
    setIsGravityAnimating,
    teleportingBoxes,
    setTeleportingBoxes,
    isTeleporting,
    setIsTeleporting,
    portalEnterAnimation, 
    setPortalEnterAnimation,
    portalConnectAnimation,
    setPortalConnectAnimation,
    portalExitAnimation,
    setPortalExitAnimation,
    activePortals,
    setActivePortals,
    
    // Board management state
    boardMode,
    currentBoardIndex,
    totalBoards: CUSTOM_BOARDS.length,
    
    // Actions
    resetGame,
    toggleBoardMode,
    nextBoard,
    undoLastMove
  };
};
