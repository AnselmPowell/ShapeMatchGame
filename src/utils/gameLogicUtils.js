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
  
  while (changed && iterations < GAME_CONFIG.MAX_GRAVITY_ITERATIONS) {
    changed = false;
    iterations++;
    
    // Process each column from bottom to top
    for (let col = 0; col < GRID_CONFIG.COLS; col++) {
      for (let row = GRID_CONFIG.ROWS - 2; row >= 0; row--) {
        const currentBox = newGrid[row][col];
        
        // Only process moveable boxes
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
  
  for (let row = 0; row < GRID_CONFIG.ROWS; row++) {
    for (let col = 0; col < GRID_CONFIG.COLS; col++) {
      const box = grid[row][col];
      
      if (isMoveableBox(box)) {
        DIRECTIONS.forEach(([dRow, dCol]) => {
          const adjRow = row + dRow;
          const adjCol = col + dCol;
          
          if (isValidCoordinate(adjRow, adjCol)) {
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
  
  // Must be within bounds
  if (!isValidCoordinate(toRow, toCol)) return false;
  
  // Target must be empty
  if (!isEmpty(grid[toRow][toCol])) return false;
  
  // Must be exactly one space left or right
  return Math.abs(toCol - fromCol) === 1;
};
