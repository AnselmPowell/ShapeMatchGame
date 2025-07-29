import React from 'react';
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
  onCellClick 
}) => {
  // Get grid dimensions
  const gridCols = grid[0]?.length || 0;
  
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
    <div className="relative mx-auto mb-8">
      <div className="">
        <div className={`grid ${getGridColsClass(gridCols)} gap-x-0 gap-y-1`}>
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
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
