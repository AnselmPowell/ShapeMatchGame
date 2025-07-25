# 🎮 Shape Match Game - Complete React Implementation

> **Advanced gravity-based puzzle game built with modern React architecture**

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-green)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-blue)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🎯 Game Overview

**Shape Match** is a sophisticated physics-based puzzle game where players manipulate colored shape boxes on an 8×10 grid. The objective is to clear all colored shapes by creating matches between identical adjacent shapes while strategically using gravity mechanics.

![Game Preview](https://via.placeholder.com/600x400/4f46e5/ffffff?text=Shape+Match+Game)

## ✨ Key Features

### 🎮 Core Mechanics
- **Horizontal-Only Movement**: Strategic horizontal piece movement
- **Realistic Gravity Physics**: Advanced gravity simulation with collision detection  
- **Adjacent Matching System**: Identical shapes touching each other disappear
- **Cascade Chain Reactions**: Matches trigger chain reactions for massive combos
- **Strategic Obstacles**: Immovable blocker boxes add challenge

### 🎨 Visual Excellence
- **Smooth 60fps Animations**: Hardware-accelerated CSS transform animations
- **Dynamic Visual Feedback**: Selection highlights, move indicators, sparkle effects
- **Modern UI Design**: Gradient backgrounds, particle effects, polished styling
- **Responsive Layout**: Perfect on desktop and mobile devices

### 🏗️ Technical Architecture
- **Modular React Components**: Clean separation of concerns
- **Custom Hooks**: Business logic separated from UI
- **Pure Utility Functions**: Testable and predictable game logic
- **Immutable State Management**: Proper React patterns throughout

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/AnselmPowell/ShapeMatchGame.git

# Navigate to project directory
cd ShapeMatchGame

# Install dependencies
npm install

# Start development server
npm run dev
```

**Game will be available at:** `http://localhost:3000`

## 🎮 How to Play

1. **Select a Shape**: Click any colored shape (gets yellow highlight)
2. **Move Horizontally**: Click adjacent empty space to move left/right only
3. **Watch Physics**: Shapes automatically fall down due to gravity
4. **Create Matches**: Adjacent identical shapes disappear with sparkle effects
5. **Chain Reactions**: Falling shapes create new matches for combos
6. **Victory**: Clear all colored shapes from the board!

### Game Elements
- **6 Shape Types**: ● (Circle), ■ (Square), ▲ (Triangle), ★ (Star), ♦ (Diamond), ♠ (Spade)
- **Consistent Colors**: Each shape always has the same color for easy recognition
- **Blocker Obstacles**: Gray brick-patterned immovable blocks for strategic challenge

## 📁 Project Structure

```
src/
├── components/
│   ├── game/                   # Game-specific components
│   │   ├── GameCell.jsx        # Individual grid cell with animations
│   │   ├── GameControls.jsx    # Control buttons and instructions  
│   │   ├── GameGrid.jsx        # Main game grid container
│   │   ├── GameStats.jsx       # Statistics display
│   │   └── VictoryModal.jsx    # Victory celebration modal
│   ├── ui/                     # Shared UI components
│   │   └── BackgroundParticles.jsx # Animated background effects
│   └── ShapeMatchGame.jsx      # Main game orchestrator
├── hooks/                      # Custom React Hooks
│   ├── useGameAnimations.js    # Animation system orchestration
│   ├── useGameLogic.js         # Game mechanics and movement
│   └── useGameState.js         # Centralized state management
├── utils/                      # Pure Utility Functions
│   ├── animationUtils.js       # Animation calculations
│   ├── gameConstants.js        # Game configuration
│   ├── gameLogicUtils.js       # Core game logic
│   └── gridUtils.js            # Grid manipulation utilities
└── styles/
    └── index.css               # Tailwind CSS + custom animations
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Technical Highlights

### Advanced Features
- **Physics Simulation**: Iterative gravity algorithm with collision detection
- **Animation System**: CSS transforms with dynamic timing coordination
- **State Management**: Complex coordinated React state with animation locks
- **Performance**: Hardware-accelerated animations, efficient rendering
- **Code Quality**: ESLint integration, modular architecture

### Architecture Benefits
- **Maintainable**: Single responsibility principle throughout
- **Testable**: Pure functions and isolated components
- **Scalable**: Easy to add new features and game modes
- **Performant**: Optimized React patterns and animations

## 🎯 Development Approach

This project demonstrates advanced React patterns:

- **Custom Hooks**: Business logic separation (`useGameState`, `useGameLogic`, `useGameAnimations`)
- **Component Composition**: Modular UI architecture
- **Immutable State**: Proper React state management
- **Animation Coordination**: Complex state synchronization
- **Pure Functions**: Testable utility modules

## 🚀 Future Enhancements

Potential features for expansion:
- **Sound Effects**: Audio feedback for moves and matches
- **Level System**: Progressive difficulty with preset challenges
- **Scoring**: Points system with cascade multipliers  
- **Power-ups**: Special abilities and game modifiers
- **Multiplayer**: Real-time competitive gameplay
- **Themes**: Different visual styles and shape sets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by classic puzzle game mechanics with modern physics

---

**⭐ Star this repository if you enjoyed the game!**

## 📞 Contact

**Anselm Powell** - [@AnselmPowell](https://github.com/AnselmPowell)

**Project Link**: [https://github.com/AnselmPowell/ShapeMatchGame](https://github.com/AnselmPowell/ShapeMatchGame)
