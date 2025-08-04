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
    setTeleportingBoxes,
    portalEnterAnimation,
    setPortalEnterAnimation,
    portalConnectAnimation,
    setPortalConnectAnimation,
    portalExitAnimation,
    setPortalExitAnimation,
    activePortals,
    setActivePortals
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
        
        // Mark source and destination portals as active
        setActivePortals([
          { row: toRow, col: toCol, portalId },
          { row: pairedPortal.row, col: pairedPortal.col, portalId }
        ]);
        
        // Set up teleportation data
        setTeleportingBoxes([{
          fromRow, // Original box position
          fromCol,
          enterRow: toRow, // Portal entrance position
          enterCol: toCol,
          exitRow: pairedPortal.row, // Portal exit position
          exitCol: pairedPortal.col,
          portalId
        }]);
        
        // Remove box from original position
        newGrid[fromRow][fromCol] = null;
        
        // Update grid (portals still in place)
        setGrid(newGrid);
        setSelectedBox(null);
        
        // Increment moves counter
        const newMoveCount = moves + 1;
        setMoves(newMoveCount);
        
        // Check if out of moves
        if (newMoveCount >= moveLimit) {
          setIsOutOfMoves(true);
        }
        
        // PHASE 1: Box enters portal animation
        setIsTeleporting(true);
        setPortalEnterAnimation(true);
        
        setTimeout(() => {
          // PHASE 2: Portal connection animation
          setPortalEnterAnimation(false);
          setPortalConnectAnimation(true);
          
          setTimeout(() => {
            // PHASE 3: Box exits from destination portal
            setPortalConnectAnimation(false);
            setPortalExitAnimation(true);
            
            // Create a new grid with the box at the destination
            const finalGrid = cloneGrid(newGrid);
            finalGrid[pairedPortal.row][pairedPortal.col] = box;
            setGrid(finalGrid);
            
            setTimeout(() => {
              // PHASE 4: Animation complete, remove portals
              setPortalExitAnimation(false);
              
              // Remove the portals from the grid
              const portalClearedGrid = cloneGrid(finalGrid);
              removePortalPair(portalClearedGrid, portalId);
              setGrid(portalClearedGrid);
              
              // Reset animation states
              setIsTeleporting(false);
              setTeleportingBoxes([]);
              setActivePortals([]);
              
              // Continue with gravity
              animateGravity(portalClearedGrid);
            }, ANIMATION_CONFIG.PORTAL_EXIT_DURATION);
          }, ANIMATION_CONFIG.PORTAL_CONNECTION_DURATION);
        }, ANIMATION_CONFIG.PORTAL_ENTER_DURATION);
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
