# Tech Context

## Technologies Used

### Core Technologies
- **React 18.2.0**: Frontend library for building the user interface
- **Vite 5.0.8**: Fast build tool and development server
- **Tailwind CSS 3.3.6**: Utility-first CSS framework for styling

### Development Tools
- **ESLint**: Code linting and quality control
- **Git**: Version control
- **npm**: Package management

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation
```bash
# Clone the repository (if applicable)
git clone https://github.com/AnselmPowell/ShapeMatchGame.git

# Navigate to project directory
cd ShapeMatchGame

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Technical Constraints

### Browser Compatibility
- Modern browsers with CSS Grid and Transform support
- Hardware acceleration for smooth animations
- Mobile support with touch events

### Performance Considerations
- Animation synchronization to prevent visual glitches
- React rendering optimization to maintain 60fps
- CSS transform usage for hardware acceleration

## Dependencies

### Primary Dependencies
- **React**: Core UI library
- **React DOM**: React renderer for the browser
- **Tailwind CSS**: Styling framework

### Dev Dependencies
- **Vite**: Build tool and development server
- **ESLint**: Code quality tool
- **PostCSS**: CSS processing for Tailwind
- **Autoprefixer**: Browser compatibility for CSS

## Tool Usage Patterns

### React Patterns
- Functional components with hooks
- Custom hooks for logic separation
- Immutable state management
- Component composition

### Tailwind CSS Usage
- Utility classes for styling
- Custom animations
- Responsive design utilities
- Extended with custom configuration

### Animation Techniques
- CSS Transforms: `transform: translateY()` for movement
- Transitions: `transition-all duration-300` for smooth effects
- Custom keyframes for match effects
- Hardware acceleration with `will-change` and `transform`

### State Management
- React's built-in useState and useReducer
- Custom hooks for domain-specific state
- Immutable update patterns
- Props for component communication