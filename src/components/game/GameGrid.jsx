import React, { useEffect } from 'react';
import GameCell from './GameCell';

/**
 * Main game grid component that renders all cells
 */
const GameGrid = ({ 
  grid, 
  selectedBox, 
  fallingBoxes, 
  matchingBoxes, 
  isValidMoveTarget,
  onCellClick,
  // Drag handlers prop
  dragHandlers 
}) => {
  // Get grid dimensions
  const gridCols = grid[0]?.length || 0;
  
  // Extract drag handlers
  const { 
    isDragging,
    dragBox,
    dragDirection,
    handleDragStart,
    handleDragMove,
    handleDragEnd 
  } = dragHandlers || {};
  
  // Add global mouse/touch event listeners to track drag outside the grid
  useEffect(() => {
    if (isDragging) {
      // Add global event listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      // Clean up listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  // Handle events on document level
  const handleMouseMove = (e) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();
  const handleTouchMove = (e) => {
    if (isDragging) {
      handleDragMove(e.touches[0].clientX);
      e.preventDefault(); // Prevent scrolling during drag
    }
  };
  const handleTouchEnd = () => handleDragEnd();
  
  // Map columns to CSS classes - ensure all classes are known to Tailwind
  const getGridColsClass = (cols) => {
    const colsMap = {
      8: 'grid-cols-8',
      9: 'grid-cols-9', 
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      13: 'grid-cols-13',
      14: 'grid-cols-14',
      15: 'grid-cols-15',
      16: 'grid-cols-16',
      17: 'grid-cols-17',
      18: 'grid-cols-18',
      19: 'grid-cols-19',
      20: 'grid-cols-20'
    };
    return colsMap[cols] || 'grid-cols-12'; // fallback
  };
  
  return (
    <div className="relative mx-12 mb-8 border border-gray-600/50 border-b-2 border-t-2 border-x-2 pt-4 pb-2 px-3 rounded-lg bg-white/5">
      <div className="border-blue-500">
        <div className={`grid ${getGridColsClass(gridCols)} gap-x-[1px] gap-y-1`}>
          {grid.map((row, rowIndex) =>
            row.map((box, colIndex) => (
              <GameCell
                key={`${rowIndex}-${colIndex}`}
                box={box}
                rowIndex={rowIndex}
                colIndex={colIndex}
                selectedBox={selectedBox}
                fallingBoxes={fallingBoxes}
                matchingBoxes={matchingBoxes}
                isValidMoveTarget={isValidMoveTarget}
                onCellClick={onCellClick}
                // Drag-related props
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                isDragging={isDragging}
                isDraggedBox={dragBox?.row === rowIndex && dragBox?.col === colIndex}
                dragDirection={dragDirection}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;