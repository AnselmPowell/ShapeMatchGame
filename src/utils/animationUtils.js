import { GRID_CONFIG, ANIMATION_CONFIG } from './gameConstants';
import { isMoveableBox, isEmpty } from './gridUtils';

/**
 * Calculate fall paths for gravity animation
 */
export const calculateFallPaths = (currentGrid) => {
  const fallPaths = [];
  
  // Get actual grid dimensions
  const gridRows = currentGrid.length;
  const gridCols = currentGrid[0]?.length || 0;
  
  for (let col = 0; col < gridCols; col++) {
    for (let row = 0; row < gridRows; row++) {
      const box = currentGrid[row][col];
      
      if (isMoveableBox(box)) {
        // Find where this box will land
        let targetRow = row;
        for (let checkRow = row + 1; checkRow < gridRows; checkRow++) {
          if (isEmpty(currentGrid[checkRow][col])) {
            targetRow = checkRow;
          } else {
            break; // Hit obstacle, stop checking
          }
        }
        
        // Box will actually fall
        if (targetRow !== row) {
          fallPaths.push({
            from: { row, col },
            to: { row: targetRow, col },
            distance: targetRow - row,
            box: { ...box } // Snapshot of box data
          });
        }
      }
    }
  }
  
  return fallPaths;
};

/**
 * Calculate animation duration based on maximum fall distance
 */
export const calculateAnimationDuration = (fallPaths) => {
  if (fallPaths.length === 0) return 0;
  
  const maxDistance = Math.max(...fallPaths.map(path => path.distance));
  return maxDistance * ANIMATION_CONFIG.GRAVITY_PER_ROW + ANIMATION_CONFIG.GRAVITY_BUFFER;
};

/**
 * Check if a specific cell is currently falling
 */
export const isCellFalling = (fallingBoxes, row, col) => {
  return fallingBoxes.some(path => path.from.row === row && path.from.col === col);
};

/**
 * Get fall distance for a specific cell
 */
export const getCellFallDistance = (fallingBoxes, row, col) => {
  const fallPath = fallingBoxes.find(path => path.from.row === row && path.from.col === col);
  return fallPath ? fallPath.distance : 0;
};

/**
 * Check if a cell is currently matching
 */
export const isCellMatching = (matchingBoxes, row, col) => {
  return matchingBoxes.some(([r, c]) => r === row && c === col);
};

/**
 * Check if a cell is part of a teleporting box animation
 * @param {Array} teleportingBoxes - Array of teleporting box data
 * @param {string} phase - 'enter' or 'exit' to check specific animation phase
 * @param {number} row - Row to check
 * @param {number} col - Column to check
 */
export const isTeleportingBox = (teleportingBoxes, phase, row, col) => {
  if (!teleportingBoxes || teleportingBoxes.length === 0) return false;
  
  return teleportingBoxes.some(teleport => {
    if (phase === 'enter') {
      // For enter animation, check if this is the original box position
      return teleport.fromRow === row && teleport.fromCol === col;
    } else if (phase === 'exit') {
      // For exit animation, check if this is the destination portal position
      return teleport.exitRow === row && teleport.exitCol === col;
    }
    return false;
  });
};

/**
 * Check if a cell is an active portal during teleportation
 */
export const isTeleportingPortal = (activePortals, row, col) => {
  if (!activePortals || activePortals.length === 0) return false;
  
  return activePortals.some(portal => 
    portal.row === row && portal.col === col
  );
}
