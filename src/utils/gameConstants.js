// Game configuration constants
export const GRID_CONFIG = {
  ROWS: 8,
  COLS: 10,
  CELL_SIZE: 48, // 12 * 4px (w-12)
  CELL_GAP: 4,   // gap-1
  TOTAL_CELL_SIZE: 52 // CELL_SIZE + CELL_GAP
};

// Shape definitions with consistent color mapping
export const SHAPES = [
  { symbol: '●', color: 'text-red-500' },      // Circle - Red
  { symbol: '■', color: 'text-blue-500' },     // Square - Blue
  { symbol: '▲', color: 'text-green-500' },    // Triangle - Green
  { symbol: '★', color: 'text-yellow-500' },   // Star - Yellow
  { symbol: '♦', color: 'text-purple-500' },   // Diamond - Purple
  { symbol: '♠', color: 'text-pink-500' }      // Spade - Pink
];

// Animation timing constants
export const ANIMATION_CONFIG = {
  HORIZONTAL_DELAY: 150,     // Delay before gravity starts
  GRAVITY_PER_ROW: 150,      // Animation time per row of falling
  MATCH_DURATION: 600,       // Match animation duration
  CASCADE_DELAY: 200,        // Delay between cascade cycles
  GRAVITY_BUFFER: 200,       // Extra time for gravity completion
  SETTLE_DELAY: 100          // Delay before match checking
};

// Game setup constants
export const GAME_CONFIG = {
  MIN_BLOCKERS: 6,
  MAX_BLOCKERS: 10,
  MIN_BOXES: 16,
  MAX_BOXES: 20,
  SPAWN_ROWS: 5,             // Only spawn in top 5 rows
  MAX_GRAVITY_ITERATIONS: 20 // Safety limit for gravity loops
};

// Direction vectors for adjacent checking
export const DIRECTIONS = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];
