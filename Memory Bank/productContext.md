# Product Context

## Why This Project Exists

Shape Match Game (also called "Shape Fusion" in the UI) was created to provide an engaging, physics-based puzzle game that combines strategic thinking with satisfying visual feedback. The game draws inspiration from classic match-three mechanics but adds a unique twist with its horizontal-only movement and realistic gravity simulation.

## Problems It Solves

1. **Entertainment Gap**: Provides a challenging yet accessible puzzle game for casual and strategic players
2. **Skills Development**: Encourages spatial reasoning, pattern recognition, and forward planning
3. **Modern Implementation**: Demonstrates React best practices with a complete, production-ready game implementation
4. **Technical Showcase**: Serves as an example of modular React architecture, custom hooks, and animation coordination

## How It Should Work

### User Flow
1. Player is presented with a grid of colored shapes and blockers
2. Player selects a shape by clicking on it (gets yellow highlight)
3. Player moves the shape horizontally by clicking an adjacent empty cell
4. After movement, shapes fall due to gravity
5. When identical shapes touch, they match and disappear
6. Chain reactions occur as shapes continue to fall
7. Player continues until all colored shapes are cleared
8. Victory screen appears with move count and option to play again

### Game Elements
- **Colored Shapes**: Six distinct shapes (Circle, Square, Triangle, Star, Diamond, Spade)
- **Blocker Obstacles**: Gray immovable blocks marked with "X" in the grid configuration
- **Empty Spaces**: Allow shapes to move and fall
- **Grid**: Configurable size, default 10×14
- **Board Modes**: Multiple predefined boards with increasing difficulty

## User Experience Goals

1. **Intuitive Interaction**: Clear visual feedback for selection and valid moves
2. **Satisfying Feedback**: Smooth animations for movement, gravity, and matches
3. **Progressive Challenge**: Difficulty increases gradually through board designs
4. **Rewarding Experience**: Positive reinforcement for matches and victory
5. **Responsive Design**: Works well on both desktop and mobile devices
6. **Modern Aesthetic**: Clean, gradient-based design with particle effects
7. **Performance**: Consistent 60fps animations and responsive controls

## Target Users
- Casual puzzle game players
- Mobile and desktop gamers
- React developers looking for code examples
- People who enjoy match-three style games but want a fresh twist