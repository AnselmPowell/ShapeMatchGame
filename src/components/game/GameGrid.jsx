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
  return (
    <div className="relative mx-auto mb-8">
      <div className="p-2">
        <div className="grid grid-cols-10 gap-1">
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
