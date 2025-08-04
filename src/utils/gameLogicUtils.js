import { GRID_CONFIG, DIRECTIONS, GAME_CONFIG } from './gameConstants';
import { 
  isValidCoordinate, 
  isMoveableBox, 
  isEmpty, 
  cloneGrid 
} from './gridUtils';

/**
 * Apply gravity to make all moveable boxes fall down
 */
export const applyGravity = (inputGrid) => {
  const newGrid = cloneGrid(inputGrid);
  let changed = true;
  let iterations = 0;
  
  // Get actual grid dimensions instead of using GRID_CONFIG
  const gridRows = inputGrid.length;
  const gridCols = inputGrid[0]?.length || 0;
  
  while (changed && iterations < GAME_CONFIG.MAX_GRAVITY_ITERATIONS) {
    changed = false;
    iterations++;
    
    // Process each column from bottom to top
    for (let col = 0; col < gridCols; col++) {
      for (let row = gridRows - 2; row >= 0; row--) {
        const currentBox = newGrid[row][col];
        
        
        // Only process moveable boxes (not blockers or portals)
        if (isMoveableBox(currentBox)) {
          const spaceBelow = newGrid[row + 1][col];
          
          // If space below is empty, drop the box
          if (isEmpty(spaceBelow)) {
            newGrid[row + 1][col] = currentBox;
            newGrid[row][col] = null;
            changed = true;
          }
        }
      }
    }
  }
  
  return newGrid;
};

/**
 * Find all matching adjacent pairs of identical shapes
 */
export const findAllMatches = (grid) => {
  const matches = [];
  const processed = new Set();
  
  // Get actual grid dimensions
  const gridRows = grid.length;
  const gridCols = grid[0]?.length || 0;
  
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const box = grid[row][col];
      
      if (isMoveableBox(box)) {
        DIRECTIONS.forEach(([dRow, dCol]) => {
          const adjRow = row + dRow;
          const adjCol = col + dCol;
          
          // Check bounds using actual grid dimensions
          if (adjRow >= 0 && adjRow < gridRows && adjCol >= 0 && adjCol < gridCols) {
            const adjacentBox = grid[adjRow][adjCol];
            
            // Found a match!
            if (isMoveableBox(adjacentBox) && adjacentBox.shape === box.shape) {
              // Create unique key to prevent duplicates
              const matchKey = `${Math.min(row, adjRow)},${Math.min(col, adjCol)}-${Math.max(row, adjRow)},${Math.max(col, adjCol)}`;
              
              if (!processed.has(matchKey)) {
                matches.push([[row, col], [adjRow, adjCol]]);
                processed.add(matchKey);
              }
            }
          }
        });
      }
    }
  }
  
  return matches;
};

/**
 * Remove matched boxes from grid
 */
export const removeMatches = (grid, matches) => {
  const newGrid = cloneGrid(grid);
  matches.forEach(match => {
    match.forEach(([row, col]) => {
      newGrid[row][col] = null;
    });
  });
  return newGrid;
};

/**
 * Validate if a move is allowed
 */
export const isValidMove = (grid, fromRow, fromCol, toRow, toCol) => {
  // Must be same row (horizontal only)
  if (fromRow !== toRow) return false;
  
  // Get actual grid dimensions for bounds checking
  const gridRows = grid.length;
  const gridCols = grid[0]?.length || 0;
  
  // Must be within bounds
  if (toRow < 0 || toRow >= gridRows || toCol < 0 || toCol >= gridCols) return false;
  
  // Target must be empty or a portal
  const targetCell = grid[toRow][toCol];
  if (targetCell !== null && targetCell.type !== 'portal') return false;
  
  // Must be exactly one space left or right
  return Math.abs(toCol - fromCol) === 1;
};

/**
 * Find a paired portal in the grid with the same portalId
 */
export const findPairedPortal = (grid, portalId, currentRow, currentCol) => {
  const gridRows = grid.length;
  
  for (let row = 0; row < gridRows; row++) {
    const gridCols = grid[row]?.length || 0;
    
    for (let col = 0; col < gridCols; col++) {
      const cell = grid[row][col];
      
      if (cell && 
          cell.type === 'portal' && 
          cell.portalId === portalId && 
          (row !== currentRow || col !== currentCol)) {
        return { row, col };
      }
    }
  }
  return null;
};

/**
 * Remove all portals with the given portalId from the grid
 */
export const removePortalPair = (grid, portalId) => {
  const gridRows = grid.length;
  
  for (let row = 0; row < gridRows; row++) {
    const gridCols = grid[row]?.length || 0;
    
    for (let col = 0; col < gridCols; col++) {
      const cell = grid[row][col];
      
      if (cell && cell.type === 'portal' && cell.portalId === portalId) {
        grid[row][col] = null;
      }
    }
  }
};
