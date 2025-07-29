import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { useGameAnimations } from '../hooks/useGameAnimations';
import { useGameLogic } from '../hooks/useGameLogic';
import BackgroundParticles from './ui/BackgroundParticles';
import GameStats from './game/GameStats';
import GameGrid from './game/GameGrid';
import GameControls from './game/GameControls';
import VictoryModal from './game/VictoryModal';

/**
 * Main Shape Match Game Component
 * Orchestrates all game functionality using custom hooks and modular components
 */
const ShapeMatchGame = () => {
  // Initialize game state
  const gameState = useGameState();
  
  // Initialize animations with game state
  const animations = useGameAnimations(gameState);
  
  // Initialize game logic with state and animations
  const gameLogic = useGameLogic(gameState, animations);
  
  // Extract needed values for cleaner JSX
  const {
    grid,
    selectedBox,
    setSelectedBox,
    moves,
    fallingBoxes,
    matchingBoxes,
    isAnimating,
    isGravityAnimating,
    boardMode,
    currentBoardIndex,
    totalBoards,
    resetGame,
    toggleBoardMode,
    nextBoard
  } = gameState;
  
  const {
    moveBox,
    isValidMoveTarget,
    getRemainingBoxes
  } = gameLogic;

  /**
   * Handle grid cell clicks for selection and movement
   */
  const handleCellClick = (row, col) => {
    if (isAnimating || isGravityAnimating) return;
    
    console.log(`Clicked on (${row},${col}), selectedBox:`, selectedBox);
    
    if (grid[row][col] === null) {
      if (selectedBox) {
        // ONLY allow horizontal movement (same row, adjacent column)
        const isSameRow = row === selectedBox.row;
        const isAdjacent = Math.abs(col - selectedBox.col) === 1;
        
        console.log(`Same row: ${isSameRow}, Adjacent: ${isAdjacent}`);
        
        if (isSameRow && isAdjacent) {
          console.log("Valid move - executing");
          moveBox(selectedBox.row, selectedBox.col, row, col);
        } else {
          console.log("Invalid move - not same row or not adjacent");
        }
      }
    } else if (grid[row][col].type !== 'blocker') {
      // Only allow selection of moveable boxes, not blockers
      console.log("Selecting box");
      setSelectedBox({ row, col });
    }
  };

  // Calculate remaining boxes for victory condition
  const remainingBoxes = getRemainingBoxes();
  const isVictory = remainingBoxes === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <BackgroundParticles />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            ✨ SHAPE FUSION ✨
          </h1>
          <p className="text-gray-300 text-lg">Match the shapes, clear the board!</p>
        </div>

        {/* Stats */}
        <GameStats moves={moves} remainingBoxes={remainingBoxes} />

        {/* Game Grid */}
        <GameGrid 
          grid={grid}
          selectedBox={selectedBox}
          fallingBoxes={fallingBoxes}
          matchingBoxes={matchingBoxes}
          isValidMoveTarget={isValidMoveTarget}
          onCellClick={handleCellClick}
        />

        {/* Controls */}
        <GameControls 
          onResetGame={resetGame}
          boardMode={boardMode}
          currentBoardIndex={currentBoardIndex}
          totalBoards={totalBoards}
          onToggleBoardMode={toggleBoardMode}
          onNextBoard={nextBoard}
        />
      </div>

      {/* Victory Modal */}
      <VictoryModal 
        moves={moves}
        onPlayAgain={resetGame}
        onNextBoard={nextBoard}
        isVisible={isVictory}
        boardMode={boardMode}
        currentBoardIndex={currentBoardIndex}
        totalBoards={totalBoards}
      />
    </div>
  );
};

export default ShapeMatchGame;
