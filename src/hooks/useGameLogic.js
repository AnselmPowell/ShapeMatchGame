import { isValidMove } from '../utils/gameLogicUtils';
import { cloneGrid, getMoveableBoxes } from '../utils/gridUtils';
import { ANIMATION_CONFIG } from '../utils/gameConstants';

/**
 * Game logic and movement hook
 */
export const useGameLogic = (gameState, animations) => {
  const {
    grid,
    setGrid,
    selectedBox,
    setSelectedBox,
    setMoves,
    isAnimating,
    isGravityAnimating
  } = gameState;
  
  const { animateGravity } = animations;

  /**
   * Execute box movement
   */
  const moveBox = (fromRow, fromCol, toRow, toCol) => {
    if (!isValidMove(grid, fromRow, fromCol, toRow, toCol) || 
        isAnimating || 
        isGravityAnimating) {
      return;
    }

    console.log(`Moving box from (${fromRow},${fromCol}) to (${toRow},${toCol})`);

    // Move box horizontally
    const newGrid = cloneGrid(grid);
    const box = newGrid[fromRow][fromCol];
    newGrid[fromRow][fromCol] = null;
    newGrid[toRow][toCol] = box;

    // Update grid immediately for horizontal move
    setGrid(newGrid);
    setSelectedBox(null);
    setMoves(prev => prev + 1);
    
    // Start gravity animation after brief delay to show horizontal move
    setTimeout(() => {
      animateGravity(newGrid);
    }, ANIMATION_CONFIG.HORIZONTAL_DELAY);
  };

  /**
   * Check if a move target is valid
   */
  const isValidMoveTarget = (row, col) => {
    if (!selectedBox) return false;
    if (grid[row][col] !== null) return false;
    if (row !== selectedBox.row) return false;
    return Math.abs(col - selectedBox.col) === 1;
  };

  /**
   * Get count of remaining moveable boxes
   */
  const getRemainingBoxes = () => {
    return getMoveableBoxes(grid).length;
  };

  return {
    moveBox,
    isValidMoveTarget,
    getRemainingBoxes
  };
};
