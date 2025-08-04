import React, { useRef } from 'react';
import { 
  isCellFalling, 
  getCellFallDistance, 
  isCellMatching,
  isTeleportingBox,
  isTeleportingPortal
} from '../../utils/animationUtils';
import { GRID_CONFIG, PORTAL_COLORS, ANIMATION_CONFIG } from '../../utils/gameConstants';

/**
 * Individual game cell component with animations and interactions
 */
const GameCell = ({ 
  box, 
  rowIndex, 
  colIndex, 
  selectedBox, 
  fallingBoxes, 
  matchingBoxes, 
  isValidMoveTarget,
  onCellClick,
  // Drag-related props
  onDragStart,
  onDragMove,
  onDragEnd,
  isDragging,
  isDraggedBox,
  dragDirection,
  // Portal animation props
  teleportingBoxes = [],
  portalEnterAnimation = false,
  portalConnectAnimation = false,
  portalExitAnimation = false,
  activePortals = []
}) => {
  // Reference to the cell element for drag manipulation
  const cellRef = useRef(null);
  
  // Animation states
  const isFalling = isCellFalling(fallingBoxes, rowIndex, colIndex);
  const fallDistance = getCellFallDistance(fallingBoxes, rowIndex, colIndex);
  const isMatching = isCellMatching(matchingBoxes, rowIndex, colIndex);
  const isSelected = selectedBox && selectedBox.row === rowIndex && selectedBox.col === colIndex;
  const isValidTarget = isValidMoveTarget(rowIndex, colIndex);
  
  // Portal animation states
  const isTeleportEnter = isTeleportingBox(teleportingBoxes, 'enter', rowIndex, colIndex);
  const isTeleportExit = isTeleportingBox(teleportingBoxes, 'exit', rowIndex, colIndex);
  const isActivePortal = isTeleportingPortal(activePortals, rowIndex, colIndex);
  const portalPhase = 
    (isActivePortal && portalEnterAnimation) ? 'enter' : 
    (isActivePortal && portalConnectAnimation) ? 'connect' : 
    (isActivePortal && portalExitAnimation) ? 'exit' : null;

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    if (box && box.type !== 'blocker' && box.type !== 'portal') {
      console.log("Mouse down on cell", rowIndex, colIndex);
      onDragStart(rowIndex, colIndex, e.clientX);
      e.preventDefault(); // Prevent text selection during drag
    }
  };
  
  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (box && box.type !== 'blocker' && box.type !== 'portal') {
      console.log("Touch start on cell", rowIndex, colIndex);
      onDragStart(rowIndex, colIndex, e.touches[0].clientX);
    }
  };
  
  const handleTouchMove = (e) => {
    console.log("Touch move on cell");
    onDragMove(e.touches[0].clientX);
    
    // Prevent scrolling while dragging
    if (isDragging) {
      e.preventDefault();
    }
  };

  // Get portal styling based on animation state
  const getPortalStyling = () => {
    if (!box || box.type !== 'portal') return '';
    
    const portalColor = PORTAL_COLORS[box.portalId] || 'bg-blue-500';
    
    // Active portal animation states
    if (isActivePortal) {
      if (portalEnterAnimation) {
        return `${portalColor} border-4 border-white/70 shadow-lg shadow-white/50 scale-110 animate-pulse`;
      }
      if (portalConnectAnimation) {
        return `${portalColor} border-4 border-white scale-125 shadow-lg shadow-white/80 animate-ping`;
      }
      if (portalExitAnimation) {
        return `${portalColor} border-4 border-white/70 shadow-lg shadow-white/50 scale-110 animate-pulse`;
      }
    }
    
    // Default portal styling or valid target styling
    const targetStyle = isValidTarget 
      ? 'ring-4 ring-green-400 ring-opacity-80 animate-pulse scale-105' 
      : '';
    return `${portalColor} border-2 border-white/30 cursor-default shadow-lg transition-all duration-300 ${targetStyle}`;
  };

  // Cell styling based on content and state
  const getCellStyling = () => {
    if (box === null) {
      return isValidTarget 
        ? 'bg-green-400/20 border-2 border-green-400/60 animate-pulse shadow-lg' 
        : '';
    } else if (box.type === 'blocker') {
      return 'bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-500 cursor-not-allowed shadow-lg transition-all duration-300';
    } else if (box.type === 'portal') {
      return getPortalStyling();
    } else {
      return 'bg-gradient-to-br from-white/90 to-white/70 border-2 border-white/30 hover:from-white/100 hover:to-white/80 shadow-lg hover:shadow-xl transition-all duration-300';
    }
  };

  // Selection and interaction styling
  const getInteractionStyling = () => {
    if (isSelected) {
      return 'ring-4 ring-yellow-400 ring-opacity-80 scale-110 shadow-2xl';
    } else if (isDraggedBox) {
      // Just add a subtle indicator that this box is being dragged
      return 'ring-2 ring-white ring-opacity-50';
    } else if (box?.type === 'portal') {
      // Portal styling
      return 'hover:scale-105 animate-pulse';
    } else if (box?.type !== 'blocker' && box !== null) {
      return 'hover:scale-105';
    }
    return '';
  };

  // Match animation styling
  const getMatchStyling = () => {
    return isMatching ? 'animate-bounce scale-125 bg-gradient-to-r from-red-400 to-pink-400' : '';
  };

  // Animation transforms
  const getAnimationStyle = () => {
    // Falling animation
    if (isFalling) {
      return {
        transform: `translateY(${fallDistance * GRID_CONFIG.TOTAL_CELL_SIZE}px)`,
        transition: `transform ${fallDistance * 150}ms ease-in`
      };
    }
    
    // Portal animations
    if (isTeleportEnter && portalEnterAnimation) {
      // Box entering portal animation - shrink and fade
      return {
        transform: 'scale(0.1)',
        opacity: 0,
        transition: `all ${ANIMATION_CONFIG.PORTAL_ENTER_DURATION}ms ease-in`
      };
    }
    
    if (isTeleportExit && portalExitAnimation) {
      // Box exiting portal animation - grow and appear
      return {
        transform: 'scale(1)',
        opacity: 1,
        transition: `all ${ANIMATION_CONFIG.PORTAL_EXIT_DURATION}ms ease-out`
      };
    }
    
    // Default transition
    return {
      transition: box === null ? 'none' : 'all 0.3s'
    };
  };

  // Render portal connection effect
  const renderPortalConnection = () => {
    if (isActivePortal && portalConnectAnimation) {
      return (
        <div className="absolute inset-0 overflow-visible">
          <div className="absolute inset-0 bg-white/30 animate-pulse z-10"></div>
          <div className="absolute inset-1 bg-white/50 rounded-full animate-ping"></div>
        </div>
      );
    }
    return null;
  };

  // Render cell content based on box type
  const renderCellContent = () => {
    if (box && box.type === 'blocker') {
      return (
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Brick pattern background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg"></div>
          <div className="absolute inset-0 opacity-60">
            {/* Horizontal lines for brick pattern */}
            <div className="absolute top-1/3 left-0 right-0 h-px bg-gray-900"></div>
            <div className="absolute top-2/3 left-0 right-0 h-px bg-gray-900"></div>
            {/* Vertical lines offset for brick pattern */}
            <div className="absolute top-0 bottom-1/3 left-1/2 w-px bg-gray-900"></div>
            <div className="absolute top-1/3 bottom-1/3 left-1/4 w-px bg-gray-900"></div>
            <div className="absolute top-1/3 bottom-1/3 right-1/4 w-px bg-gray-900"></div>
            <div className="absolute top-2/3 bottom-0 left-1/2 w-px bg-gray-900"></div>
          </div>
        </div>
      );
    } else if (box && box.type === 'portal') {
      return (
        <div className="w-full h-full flex items-center justify-center relative cursor-pointer">
          {/* Portal visual - swirling effect */}
          <div className="absolute inset-2 rounded-full bg-white/30 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white/20 animate-spin" 
               style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
          <div className="absolute inset-4 rounded-full bg-white/10 animate-pulse"></div>
          
          {/* Portal connection animation */}
          {renderPortalConnection()}
          
        </div>
      );
    } else if (box) {
      return (
        <div className={`
          w-full h-full flex items-center justify-center text-4xl font-bold
          ${isMatching ? 'text-white animate-pulse' : box.color}
          transition-all duration-300
        `}>
          {box.shape}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={cellRef}
      className={`
        relative w-12 h-12 rounded-lg cursor-pointer transform
        ${getCellStyling()}
        ${getInteractionStyling()}
        ${getMatchStyling()}
        ${isFalling ? 'falling-box' : ''}
        ${isDraggedBox && dragDirection === 'left' ? 'drag-left' : ''}
        ${isDraggedBox && dragDirection === 'right' ? 'drag-right' : ''}
        ${isTeleportEnter ? 'teleport-enter' : ''}
        ${isTeleportExit ? 'teleport-exit' : ''}
      `}
      style={getAnimationStyle()}
      onClick={() => onCellClick(rowIndex, colIndex)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => {
        console.log("Touch end on cell - calling onDragEnd");
        onDragEnd();
      }}
      data-row={rowIndex}
      data-col={colIndex}
    >
      {renderCellContent()}
      
      {/* Selection glow effect - used for both click selection and drag selection */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-yellow-400/30 animate-pulse"></div>
      )}
      
      {/* Sparkle effect for matching boxes */}
      {isMatching && (
        <div className="absolute inset-0 rounded-lg">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameCell;