// Game configuration constants
export const GRID_CONFIG = {
  ROWS: 10,
  COLS: 14, // Updated to support wider grids
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

// Symbol to shape mapping for custom board conversion
export const SYMBOL_TO_SHAPE = {
  '●': { symbol: '●', color: 'text-red-500' },
  '■': { symbol: '■', color: 'text-blue-500' },
  '▲': { symbol: '▲', color: 'text-green-500' },
  '★': { symbol: '★', color: 'text-yellow-500' },
  '♦': { symbol: '♦', color: 'text-purple-500' },
  '♠': { symbol: '♠', color: 'text-pink-500' }
};

// Portal colors for visual distinction
export const PORTAL_COLORS = {
  'p1': 'bg-cyan-500',
  'p2': 'bg-purple-500',
  'p3': 'bg-amber-500'
};

// Custom board layouts - Educational progression
export const CUSTOM_BOARDS = [
  // Portal test level
  [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "X", null, null, "p2", null],
    [null, '♦', null, '★', "X", null, null, '★', null],
    ["p2", "p1", null, '■', "X", null, '■', '♦', "p1"]
  ],

  [
    [null, null, null, null, null, null, null, null, null ],
    [null, null, null, null, null, null, null, null, null ],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, '■', null, null, '■', null, null]
  ],

  [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, '■', null, null, null],
    [null, null, '■', '♠', null, null, '♠', null, null, null]
  ],
   [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, '♠', null, null, null, null, '♠', null, null],
    [null, null, "X", null, null, null, null, "X", null, null],
    [null, null, null, '♦', null, '♦', null, null, null, null]
  ],
  [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, '●', null, null, null, null, null],
    [null, null, null, null, '■', null, null, null, null, null],
    [null, null, null, null, "X", null, null, null, null, null],
    [null, null, '●', null, "X", null, null, '■', null, null]
  ],

  [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, '♠', null, null, null, null],
    [null, null, null, null, null, '●', null, null, null, null],
    [null, null, null, null, null, "X", null, null, null, null],
    [null, null, '■', '●', '■', "X", '♠', null, null, null]
  ],

  [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, '●', null, null, null, null],
    [null, null, null, null, '■', '★', null, null, null, null],
    [null, null, '■', null, "X", "X", null, null, null, null],
    [null, null, '●', '■', null, '★', null, '★', null, null]
   ],
   [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, '▲', null, null],
    ['●', null, null, '●', null, null, null, "X", null, null],
    ["X", null, null, "X", null, null, null, '▲', null, null],
    ["X", "X", null, null, null, null, null, "X", null, null],
    [null, null, '♦', null, null, '▲', null, null, null, null],
    [null, null, "X", null, null, '♦', null, null, null, null],
    [null, null, null, null, null, "X", null, null, null, null]
  ],
   [
    [null, null, null, '★', null, null, null, null, null, null],
    [null, '●', null, '●', null, null, '■', null, '■', null],
    [null, "X", null, "X", null, null, "X", null, "X", null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, '★', null, '♦', null, null, '♠', null, '▲', null],
    [null, "X", "X", "X", null, null, "X", "X", "X", null],
    [null, null, '♦', null, '♦', null, null, null, '♠', null],
    [null, null, null, null, null, null, null, null, '▲', null]
  ],
   [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, '■', null, null],
  ['♦', null, null, null, null, '♦', '★', '▲', null, null],
  ["X", "X", null, null, null, "X", "X", "X", null, null],
  ["X", null, null, null, null, null, null, null, null, '■'],
  [null, null, null, '■', null, null, null, null, null, '▲'],
  ["X", "X", '♦', "X", '▲', "X", "X", "X", "X", "X"],
  [null, null, "X", "X", '★', "X", null, null, null, null]
],
 [
  [ null, null, null, null, null, null, '▲', null, null],
  [ null, "X", null, '■', null, null, "X", "X", "X"],
  [ null, "X", '♦', '♠', null, '♦', null, '♠', null],
  [ null, null, "X", "X", null, "X", "X", "X", "X"],
  [ null, null, "X", null, null, null, null, null, '▲'],
  [ '▲', null, null, null, null, null, null, '♠', null],
  [ '♠', null, null, '♦', null, null, '▲', "X", "X"],
  [ "X", "X", null, "X", null, '■', "X", null, "X"]
],
[
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, '♦', '★', null, null, null],
  [null, null, '★', null, '★', '■', '●', null, null, null],
  [null, null, '■', '★', '♦', '●', '♠', '♦', null, null],
  [null, null, '♠', '■', '★', '♦', '▲', '★', null, null],
  [null, null, '▲', '♠', '♦', '●', '■', '●', null, null],
  [null, null, '★', '▲', '★', '■', '▲', '♠', '♦', null],
   ["X", "X", "X", "X", "X", "X", "X", "X", "X","X"]
],
  [
    [null, null, null, null, null, null, null, null, null, null], 
    [null, '★', null, null, null, null, null, '●', null, null], 
    [null, "X", null, "X", null, null, null, "X", null, null], 
    [null, null, null, null, null, null, '■', null, null, null], 
    [null, '●', null, null, null, '★', null, '♠', null, null], 
    [null, "X", "X", null, null, null, null, '■', null, null], 
    [null, null, null, null, null, "X", null, "X", null, null], 
    [null, null, '♠', null, '♠', null, null, null, null, null]
  ],
   [
    [null, null, null, "X", "X", null, null, null, null, null],
    [null, null, null, "X", '●', '★', null, null, null, null],
    [null, null, null, null, '■', "X", null, null, null, null],
    ["X", '●', "X", "X", '★', null, null, null, null, null],
    [null, "X", null, null, '♦', "X", "X", "X", '■', "X"],
    [null, null, null, null, '▲', null, null, null, "X", null],
    [null, null, null, null, '♦', null, null, null, null, null],
    [null, null, null, '♠', '▲','♦', null, null, null, null],
    [null, null, null, '■', '♠',  '■', null, null, null, null]
  ],
  [
    [null, null, null, null, null, null, null, null, null, '■', null],
    [null, "X", '▲', null, null, null, null, null, null, "X", null],
    ['■', null, '♠', null, null, null, null, null, null, "X", null],
    ['▲', null, '●', null, null, null, null, null, null, '♦', null],
    ["X", null, "X", null, '■', null, null, null, null, "X", null],
    [null, null, null, '▲', "X", null, null, null, '♦', null, null],
    [null, null, null, '♠', '★', null, null, null, '●', null, null],
    [null, '■', null, "X", '♦', '★', null, '●', '♦', null, null]
  ],
    [
    [null, null, null, null, null, null, '■', null, '♠', null, null],
    ["X", '●', null, null, null, null, "X", "X", "X", "X", null],
    ["X", "X",'♠' , "X", "X", null, null, null, null, null, null],
    [null, null, "X", null, null, '★', '■', null, null, '★', null],
    [null, null, null, null, null, "X", "X", null, null, "X", "X"],
    [null, null, null, null, null, null, null, null, '●', null, null],
    [null, '▲', null, null, '♦', null, null, null, '♦', null, '▲'],
    ["X", "X", '●', "X", "X", "X", "X", "X", '●', "X", "X"],
    [null, null, "X", null, null, null, null, null, "X", null, null]
  ],
   [
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, '■', '♠', '■', null],
    [null, null, null, null, '▲', null, '●', null, '♦', '▲', '♦', null],
    [null, null, null, null, "X", '♠', "X", null, "X", "X", "X", null],
    [null, null, null, null, "X", "X", "X", null, null, "X", null, null],
    [null, null, null, null, null, null, '●', null, null, null, null, null]
  ],
  [
    ['★', null, null, null, null, null, null, null, null, null, null, "X", null, null],
    ["X", null, null, null, null, '■', '▲', null, null, null, '★', null, null, null],
    [null, null, null, null, "X", "X", "X", null, "X", null, '●', null, null, null],
    [null, null, null, '▲', null, null, null, '♠', null, null, "X", null, '♠', null],
    ['■', null, null, '■', null, null, null, '▲', null, null, null, null, '●', null],
    ["X", '▲', "X", "X", null, null, null, '★', null, '●', null, null, "X", null],
    ["X", "X", "X", "X", '★', "X", "X", '▲', "X", "X", '▲', "X", null, null],
    ["X", "X", "X", "X", "X", null, "X", "X", null, "X", "X", null, null, null]
  ],
[
  [null, null, '■', null, '★', null, '★', null, null, null],
  [null, null, "X", null, "X", null, "X", null, null, null],
  [null, null, null, null, null, null, '♦', '●', null, null],
  ['▲', null, null, null, null, null, "X", "X", "X", "X"],
  ["X", null, null, null, "X", '♠', null, '♦', null, null],
  ['●', '■', null, null, "X", "X", '★', "X", "X", null],
  ["X", "X", "X", null, null, null, "X", null, null, '▲'],
  [null, null, "X", "X", null, null, null, null, "X", "X"],
  ['★', null, null, '♦', null, null, null, "X", "X", null],
  ["X", "X", "X", '♠', "X", "X", '●', "X", null, null]
],
[
  ['▲', null, null, null, null, null, '●', null, "X", '★', null],
  ["X", "X", "X", null, null, null, '▲', "X", "X", "X", null],
  [null, null, null, null, "X", null, '●', null, null, null, null],
  [null, null, '★', null, null, null, "X", null, '★', "X", null],
  [null, null, "X", "X", "X", null, null, null, "X", null, null],
  [null, null, null, null, "X", null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null],
  [null, null, '■', null, '■', null, null, null, null, null, null],
  ["X", '●', "X", "X", "X", '▲', '●', "X", "X", "X", null]
]

];

// Animation timing constants
export const ANIMATION_CONFIG = {
  HORIZONTAL_DELAY: 150,     // Delay before gravity starts
  GRAVITY_PER_ROW: 150,      // Animation time per row of falling
  MATCH_DURATION: 600,       // Match animation duration
  CASCADE_DELAY: 200,        // Delay between cascade cycles
  GRAVITY_BUFFER: 200,       // Extra time for gravity completion
  SETTLE_DELAY: 100,         // Delay before match checking
  PORTAL_ENTER_DURATION: 300,    // Box enters portal animation
  PORTAL_CONNECTION_DURATION: 200, // Portal connection animation  
  PORTAL_EXIT_DURATION: 300,     // Box exits portal animation
  TELEPORT_DURATION: 800     // Total teleportation animation (enter+connection+exit)
};

// Game setup constants
export const GAME_CONFIG = {
  MIN_BLOCKERS: 6,
  MAX_BLOCKERS: 18,
  MIN_BOXES: 16,
  MAX_BOXES: 20,
  SPAWN_ROWS: 5,             // Only spawn in top 5 rows
  MAX_GRAVITY_ITERATIONS: 20 // Safety limit for gravity loops
};

// Move limits for each custom board level
export const LEVEL_MOVE_LIMITS = [
  6,  // Level 0 - Portal test level
  4,  // Level 1 
  8,  // Level 2 
  8, // Level 3 
  4, // Level 4 
  6, // Level 5 
  6, // Level 6 
  10, // Level 7 
  18, // Level 8
  36, // Level 9 
  40, // Level 10
  1, // Level 11
  18, // Level 12 
  30, // Level 13 
  40, // Level 14 
  50, // Level 15 
  20, // Level 16 
  55, // Level 17
  60,  // Level 18
  50, // Level 19
];

// Direction vectors for adjacent checking
export const DIRECTIONS = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];
