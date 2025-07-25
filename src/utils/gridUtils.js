import { GRID_CONFIG, SHAPES, GAME_CONFIG } from './gameConstants';

/**
 * Create a random moveable box with shape and color
 */
export const createRandomBox = () => {
  const shapeData = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  return {
    shape: shapeData.symbol,
    color: shapeData.color,
    id: Math.random().toString(36).substr(2, 9)
  };
};

/**
 * Create a blocker box (immovable obstacle)
 */
export const createBlockerBox = () => ({
  type: 'blocker',
  id: Math.random().toString(36).substr(2, 9)
});

/**
 * Create an empty grid structure
 */
export const createEmptyGrid = () => {
  return Array(GRID_CONFIG.ROWS)
    .fill(null)
    .map(() => Array(GRID_CONFIG.COLS).fill(null));
};

/**
 * Check if coordinates are within grid bounds
 */
export const isValidCoordinate = (row, col) => {
  return row >= 0 && row < GRID_CONFIG.ROWS && 
         col >= 0 && col < GRID_CONFIG.COLS;
};

/**
 * Check if a cell contains a moveable box
 */
export const isMoveableBox = (box) => {
  return box && box.type !== 'blocker';
};

/**
 * Check if a cell is empty
 */
export const isEmpty = (box) => {
  return box === null;
};

/**
 * Check if a cell contains a blocker
 */
export const isBlocker = (box) => {
  return box && box.type === 'blocker';
};

/**
 * Get all moveable boxes from grid (for counting remaining)
 */
export const getMoveableBoxes = (grid) => {
  return grid.flat().filter(isMoveableBox);
};

/**
 * Create a deep copy of the grid for immutable updates
 */
export const cloneGrid = (grid) => {
  return grid.map(row => [...row]);
};
