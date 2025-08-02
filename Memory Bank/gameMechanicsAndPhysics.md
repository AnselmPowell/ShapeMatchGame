# Game Mechanics and Physics

## Movement Systems

The game provides two complementary ways to move shapes:

### 1. Click-Based Movement (Original System)

The traditional select-and-move system:
1. Player clicks on a shape to select it (gets highlighted with yellow border)
2. Player clicks on an adjacent empty cell in the same row to move the shape
3. The shape moves to the new position if the move is valid
4. The selection is cleared after movement

```javascript
// Core click movement logic
const handleCellClick = (row, col) => {
  if (isAnimating || isGravityAnimating || isOutOfMoves) return;
  
  if (grid[row][col] === null) {
    if (selectedBox) {
      // ONLY allow horizontal movement (same row, adjacent column)
      const isSameRow = row === selectedBox.row;
      const isAdjacent = Math.abs(col - selectedBox.col) === 1;
      
      if (isSameRow && isAdjacent) {
        moveBox(selectedBox.row, selectedBox.col, row, col);
      }
    }
  } else if (grid[row][col].type !== 'blocker') {
    // Select a moveable box
    setSelectedBox({ row, col });
  }
};
```

### 2. Drag/Swipe Movement (Additional System)

A touch-friendly drag system that works alongside the click system:
1. Player presses and holds on a shape
2. Player drags horizontally to indicate movement direction
3. Shape follows the finger/mouse with an elastic effect
4. When released, shape moves if dragged far enough (40% of cell width)
5. If not dragged far enough or to an invalid position, shape returns to original position

Both systems use the same underlying moveBox function, ensuring consistent physics and game rules. This dual approach makes the game accessible on both desktop and mobile devices.

## Move Limit System

Each level in the game has a predefined move limit that players must adhere to in order to complete the level successfully:

```javascript
// Move limits for each custom board level
export const LEVEL_MOVE_LIMITS = [
  5,  // Level 1 - Simple match
  8,  // Level 2 - Basic movement
  10, // Level 3 - Blocker introduction
  // ... more levels
];
```

### Key Move Limit Principles

1. **Level-Specific Limits**:
   - Each level has a custom move limit appropriate to its difficulty
   - Move limits increase as levels become more complex
   - Visual feedback shows remaining moves with color changes

2. **Game Over Condition**:
   - When moves reach the limit, the game enters an "out of moves" state
   - Player is prevented from making additional moves
   - Failure modal appears to allow retrying the level

3. **Implementation Details**:
   - Move incrementation happens in the moveBox function
   - Checks for reaching the limit occur after each move
   - State is synchronized to prevent moves after the limit is reached

## Core Physics System

### Gravity System

The Shape Match Game implements a custom gravity simulation that creates realistic falling behavior for the shapes:

```javascript
// Pseudocode representation of gravity algorithm
function applyGravity(grid) {
  let somethingFell = false;
  
  // Process bottom-to-top and left-to-right
  for (let row = GRID_CONFIG.ROWS - 2; row >= 0; row--) {
    for (let col = 0; col < GRID_CONFIG.COLS; col++) {
      // Skip empty cells and blockers
      if (!grid[row][col] || grid[row][col].type === 'blocker') continue;
      
      // Check if space below is empty
      if (grid[row + 1][col] === null) {
        // Move box down one space
        grid[row + 1][col] = grid[row][col];
        grid[row][col] = null;
        somethingFell = true;
        
        // Mark as falling for animation
        fallingBoxes.add(`${row+1}-${col}`);
      }
    }
  }
  
  // Return whether anything moved (for continued iteration)
  return somethingFell;
}
```

### Key Physics Principles

1. **Iterative Gravity**:
   - The gravity system processes the grid repeatedly until no more movement occurs
   - Safety limit (MAX_GRAVITY_ITERATIONS) prevents infinite loops
   - Each iteration processes cells from bottom-to-top to prevent "teleporting" through multiple spaces

2. **Collision Detection**:
   - Shapes stop falling when they encounter another shape or blocker
   - Blockers act as immovable obstacles
   - Collision is detected before movement occurs

3. **Coordinated Animation**:
   - Fall distance determines animation duration (further falls take longer)
   - Animations use CSS transforms for hardware acceleration
   - Animation timing is synchronized with state updates

## Match Detection System

### Adjacent Matching Algorithm

```javascript
// Pseudocode for match detection
function findMatches(grid) {
  const matches = new Set();
  
  // Process each cell
  for (let row = 0; row < GRID_CONFIG.ROWS; row++) {
    for (let col = 0; col < GRID_CONFIG.COLS; col++) {
      // Skip empty cells and blockers
      if (!grid[row][col] || grid[row][col].type === 'blocker') continue;
      
      const symbol = grid[row][col].symbol;
      
      // Check all four directions
      for (const [dRow, dCol] of DIRECTIONS) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        
        // Skip out of bounds
        if (newRow < 0 || newRow >= GRID_CONFIG.ROWS || 
            newCol < 0 || newCol >= GRID_CONFIG.COLS) continue;
        
        // Check if adjacent cell has matching symbol
        if (grid[newRow][newCol]?.symbol === symbol) {
          matches.add(`${row}-${col}`);
          matches.add(`${newRow}-${newCol}`);
        }
      }
    }
  }
  
  return matches;
}
```

### Key Matching Principles

1. **Adjacent Detection**:
   - Checks all four directions (up, down, left, right)
   - Same symbols must be directly touching
   - Multiple matches are all collected in a single pass

2. **Match Processing**:
   - Matched shapes are removed from grid
   - Empty spaces trigger gravity
   - New matches can form after gravity (cascades)

3. **Cascade System**:
   - After gravity is applied, match detection runs again
   - This creates chain reactions when falling shapes create new matches
   - Process continues until no more matches are found

## Movement Mechanics

### Horizontal-Only Movement

The game restricts movement to horizontal only, adding strategic depth:

```javascript
// Movement validation
const isSameRow = row === selectedBox.row;
const isAdjacent = Math.abs(col - selectedBox.col) === 1;

if (isSameRow && isAdjacent) {
  // Valid move
  moveBox(selectedBox.row, selectedBox.col, row, col);
} else {
  // Invalid move
}
```

### Key Movement Principles

1. **Selection System**:
   - Click to select a movable shape (not blockers)
   - Selected shape gets highlighted
   - Clicking another shape changes selection

2. **Movement Validation**:
   - Must be same row (horizontal only)
   - Must be adjacent (no teleporting)
   - Destination must be empty

3. **Movement Animation**:
   - Smooth transition using CSS transforms
   - Short delay before gravity takes effect
   - Visual feedback for selection and valid moves

## Cascade and Chain Reaction System

### Cascade Algorithm

```javascript
// Pseudocode for cascade system
async function processCascades() {
  let continueProcessing = true;
  
  while (continueProcessing) {
    // Apply gravity until nothing falls anymore
    let gravityApplied = false;
    let gravityIterations = 0;
    
    while (applyGravity() && gravityIterations < MAX_GRAVITY_ITERATIONS) {
      gravityApplied = true;
      gravityIterations++;
      
      // Wait for animations to complete
      await delay(calculateGravityDuration());
    }
    
    // Find and process matches
    const matches = findMatches();
    
    if (matches.size > 0) {
      // Remove matches
      removeMatches(matches);
      
      // Wait for match animations
      await delay(ANIMATION_CONFIG.MATCH_DURATION);
      
      // Continue the cascade
      continueProcessing = true;
    } else {
      // No more matches, end cascade
      continueProcessing = gravityApplied;
    }
  }
}
```

### Key Cascade Principles

1. **Iterative Processing**:
   - Repeatedly apply gravity and check for matches
   - Continue until no more movement or matches occur
   - Animation timing is critical for visual understanding

2. **Chain Reaction Scoring**:
   - Each cascade level increases potential score multiplier
   - Creates incentive for strategic piece placement
   - Rewards thinking multiple moves ahead

3. **Animation Coordination**:
   - Each step in the cascade has its own animation timing
   - Gravity animations adjust duration based on fall distance
   - Match animations use scale and opacity for visual pop

## Victory Condition

The game is won when all colored shapes are removed from the board:

```javascript
// Victory check
const remainingBoxes = getRemainingBoxes();
const isVictory = remainingBoxes === 0;

// Count remaining boxes
function getRemainingBoxes() {
  let count = 0;
  
  for (let row = 0; row < GRID_CONFIG.ROWS; row++) {
    for (let col = 0; col < GRID_CONFIG.COLS; col++) {
      if (grid[row][col] && grid[row][col].type !== 'blocker') {
        count++;
      }
    }
  }
  
  return count;
}
```

## Physics and Animation Timing

The game uses a sophisticated timing system to create realistic physics feel:

| Animation | Timing | Configuration |
|-----------|--------|---------------|
| Horizontal Movement | 150ms | HORIZONTAL_DELAY |
| Gravity (per row) | 150ms | GRAVITY_PER_ROW |
| Match/Disappear | 600ms | MATCH_DURATION |
| Cascade Delay | 200ms | CASCADE_DELAY |
| Gravity Buffer | 200ms | GRAVITY_BUFFER |
| Settle Delay | 100ms | SETTLE_DELAY |

These timings are carefully calibrated to create a natural feel while maintaining responsive gameplay.