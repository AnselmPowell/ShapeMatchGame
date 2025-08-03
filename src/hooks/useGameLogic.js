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
    moves,
    setMoves,
    moveLimit,
    setIsOutOfMoves,
    isAnimating,
    isGravityAnimating
  } = gameState;
  
  const { animateGravity } = animations;

  /**
   * Execute box movement
   */
  const moveBox = (fromRow, fromCol, toRow, toCol) => {
    console.log(`moveBox called with: fromRow=${fromRow}, fromCol=${fromCol}, toRow=${toRow}, toCol=${toCol}`);
    console.log("Animation state:", isAnimating, isGravityAnimating);
    
    if (!isValidMove(grid, fromRow, fromCol, toRow, toCol)) {
      console.log("Invalid move - failed isValidMove check");
      return;
    }
    
    if (isAnimating || isGravityAnimating) {
      console.log("Can't move - animations in progress");
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
    
    // Increment moves and check limit
    const newMoveCount = moves + 1;
    setMoves(newMoveCount);
    console.log(`Moves updated: ${moves} -> ${newMoveCount}`);
    
    // Check if out of moves (will be one move ahead)
    if (newMoveCount >= moveLimit) {
      setIsOutOfMoves(true);
      console.log("Out of moves!");
    }
    
    // Start gravity animation after brief delay to show horizontal move
    console.log("Setting timeout for gravity animation");
    setTimeout(() => {
      console.log("Starting gravity animation");
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
