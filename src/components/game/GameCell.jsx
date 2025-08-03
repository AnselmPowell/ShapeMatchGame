import React, { useRef } from 'react';
import { 
  isCellFalling, 
  getCellFallDistance, 
  isCellMatching 
} from '../../utils/animationUtils';
import { GRID_CONFIG } from '../../utils/gameConstants';

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
  dragDirection
}) => {
  // Reference to the cell element for drag manipulation
  const cellRef = useRef(null);
  
  // Animation states
  const isFalling = isCellFalling(fallingBoxes, rowIndex, colIndex);
  const fallDistance = getCellFallDistance(fallingBoxes, rowIndex, colIndex);
  const isMatching = isCellMatching(matchingBoxes, rowIndex, colIndex);
  const isSelected = selectedBox && selectedBox.row === rowIndex && selectedBox.col === colIndex;
  const isValidTarget = isValidMoveTarget(rowIndex, colIndex);

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    if (box && box.type !== 'blocker') {
      console.log("Mouse down on cell", rowIndex, colIndex);
      onDragStart(rowIndex, colIndex, e.clientX);
      e.preventDefault(); // Prevent text selection during drag
    }
  };
  
  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (box && box.type !== 'blocker') {
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

  // Cell styling based on content and state
  const getCellStyling = () => {
    if (box === null) {
      return isValidTarget 
        ? 'bg-green-400/20 border-2 border-green-400/60 animate-pulse shadow-lg' 
        : '';
    } else if (box.type === 'blocker') {
      return 'bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-500 cursor-not-allowed shadow-lg transition-all duration-300';
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
    return {
      transform: isFalling 
        ? `translateY(${fallDistance * GRID_CONFIG.TOTAL_CELL_SIZE}px)` 
        : undefined,
      transition: isFalling 
        ? `transform ${fallDistance * 150}ms ease-in`
        : box === null ? 'none' : 'all 0.3s'
    };
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