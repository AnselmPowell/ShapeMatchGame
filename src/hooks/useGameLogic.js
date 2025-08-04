import { isValidMove, findPairedPortal, removePortalPair } from '../utils/gameLogicUtils';
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
    setPreviousGridState,
    isAnimating,
    isGravityAnimating,
    setIsTeleporting,
    setTeleportingBoxes
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

    // Save current grid state before making the move
    setPreviousGridState(cloneGrid(grid));

    // Move box horizontally
    const newGrid = cloneGrid(grid);
    const box = newGrid[fromRow][fromCol];
    newGrid[fromRow][fromCol] = null;
    
    // Check if destination is a portal
    if (newGrid[toRow][toCol]?.type === 'portal') {
      const portalId = newGrid[toRow][toCol].portalId;
      console.log(`Moving box to portal ${portalId}`);
      
      // Find the paired portal
      const pairedPortal = findPairedPortal(newGrid, portalId, toRow, toCol);
      
      if (pairedPortal) {
        console.log(`Found paired portal at (${pairedPortal.row},${pairedPortal.col})`);
        
        // Mark as teleporting for animation purposes
        setIsTeleporting(true);
        setTeleportingBoxes([{
          fromRow: toRow,
          fromCol: toCol,
          toRow: pairedPortal.row,
          toCol: pairedPortal.col
        }]);
        
        // Move the box to the destination portal
        newGrid[pairedPortal.row][pairedPortal.col] = box;
        
        // Remove both portals from the grid
        removePortalPair(newGrid, portalId);
        
        // Update grid immediately
        setGrid(newGrid);
        setSelectedBox(null);
        
        // Increment moves and check limit
        const newMoveCount = moves + 1;
        setMoves(newMoveCount);
        console.log(`Moves updated: ${moves} -> ${newMoveCount}`);
        
        // Check if out of moves
        if (newMoveCount >= moveLimit) {
          setIsOutOfMoves(true);
          console.log("Out of moves!");
        }
        
        // Start gravity animation after teleport animation
        setTimeout(() => {
          setIsTeleporting(false);
          setTeleportingBoxes([]);
          animateGravity(newGrid);
        }, ANIMATION_CONFIG.TELEPORT_DURATION);
      } else {
        // If no paired portal found (shouldn't happen in normal gameplay)
        console.log("No paired portal found - just place on the portal");
        newGrid[toRow][toCol] = box;
        
        // Update grid immediately
        setGrid(newGrid);
        setSelectedBox(null);
        
        // Increment moves and check limit
        const newMoveCount = moves + 1;
        setMoves(newMoveCount);
        console.log(`Moves updated: ${moves} -> ${newMoveCount}`);
        
        // Check if out of moves
        if (newMoveCount >= moveLimit) {
          setIsOutOfMoves(true);
          console.log("Out of moves!");
        }
        
        // Start gravity animation after brief delay
        setTimeout(() => {
          animateGravity(newGrid);
        }, ANIMATION_CONFIG.HORIZONTAL_DELAY);
      }
    } else {
      // Regular move - just place the box
      newGrid[toRow][toCol] = box;
      
      // Update grid immediately
      setGrid(newGrid);
      setSelectedBox(null);
      
      // Increment moves and check limit
      const newMoveCount = moves + 1;
      setMoves(newMoveCount);
      console.log(`Moves updated: ${moves} -> ${newMoveCount}`);
      
      // Check if out of moves
      if (newMoveCount >= moveLimit) {
        setIsOutOfMoves(true);
        console.log("Out of moves!");
      }
      
      // Start gravity animation after brief delay
      console.log("Setting timeout for gravity animation");
      setTimeout(() => {
        console.log("Starting gravity animation");
        animateGravity(newGrid);
      }, ANIMATION_CONFIG.HORIZONTAL_DELAY);
    }
  };

  /**
   * Check if a move target is valid
   */
  const isValidMoveTarget = (row, col) => {
    if (!selectedBox) return false;
    
    // Must be same row
    if (row !== selectedBox.row) return false;
    
    // Must be adjacent
    if (Math.abs(col - selectedBox.col) !== 1) return false;
    
    // Target must be empty or a portal
    const targetCell = grid[row][col];
    return targetCell === null || targetCell?.type === 'portal';
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
