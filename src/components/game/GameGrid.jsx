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
  dragHandlers,
  // Game state for animations
  gameState
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
    if (isDragging && handleDragMove && handleDragEnd) {
      console.log("Setting up global event listeners for drag");
      
      // Define handlers within the effect to ensure proper references
      const mouseMoveHandler = (e) => {
        console.log("Global mouse move");
        handleDragMove(e.clientX);
      };
      
      const mouseUpHandler = () => {
        console.log("Global mouse up - ending drag");
        handleDragEnd();
      };
      
      const touchMoveHandler = (e) => {
        console.log("Global touch move");
        if (isDragging) {
          handleDragMove(e.touches[0].clientX);
          e.preventDefault(); // Prevent scrolling during drag
        }
      };
      
      const touchEndHandler = () => {
        console.log("Global touch end - ending drag");
        handleDragEnd();
      };
      
      // Add event listeners
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('touchend', touchEndHandler);
      
      // Clean up
      return () => {
        console.log("Removing global event listeners");
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);
  
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
  
  // Ensure we pass all the drag handler props correctly to each cell
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
                // Drag-related props - ensure these are all defined
                onDragStart={handleDragStart || (() => {})}
                onDragMove={handleDragMove || (() => {})}
                onDragEnd={handleDragEnd || (() => {})}
                isDragging={isDragging || false}
                isDraggedBox={(dragBox?.row === rowIndex && dragBox?.col === colIndex) || false}
                dragDirection={dragDirection || null}
                // Portal animation props
                teleportingBoxes={gameState?.teleportingBoxes || []}
                portalEnterAnimation={gameState?.portalEnterAnimation || false}
                portalConnectAnimation={gameState?.portalConnectAnimation || false}
                portalExitAnimation={gameState?.portalExitAnimation || false}
                activePortals={gameState?.activePortals || []}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;