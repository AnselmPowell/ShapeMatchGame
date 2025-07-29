import React from 'react';

/**
 * Game controls and instructions component
 */
const GameControls = ({ 
  onResetGame, 
  boardMode, 
  currentBoardIndex, 
  totalBoards, 
  onToggleBoardMode, 
  onNextBoard 
}) => {
  return (
    <div className="text-center">
      {/* Board Mode Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {/* Mode Toggle Button */}
        <button
          onClick={onToggleBoardMode}
          className={`px-6 py-3 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            boardMode === 'custom' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
          }`}
        >
          {boardMode === 'custom' ? '🎯 Level Mode' : '🎲 Random Mode'}
        </button>

        {/* Next Board Button - Only show in custom mode */}
        {boardMode === 'custom' && (
          <button
            onClick={onNextBoard}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            ⏭️ Next Level
          </button>
        )}

        {/* New Game Button */}
        <button
          onClick={onResetGame}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          🔄 Restart
        </button>
      </div>

      {/* Simple Level Info Display */}
      {boardMode === 'custom' && (
        <div className="mb-4 p-3 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 max-w-xs mx-auto">
          <p className="text-white font-semibold">
            🎯 Level {currentBoardIndex + 1} of {totalBoards}
          </p>
          <p className="text-gray-300 text-sm">Custom Layout Mode</p>
        </div>
      )}

      {/* Random Mode Info */}
      {boardMode === 'random' && (
        <div className="mb-4 p-3 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 max-w-xs mx-auto">
          <p className="text-white font-semibold">🎲 Random Generation</p>
          <p className="text-gray-300 text-sm">Procedural Layout Mode</p>
        </div>
      )}
      
      {/* Game Instructions */}
      <div className="mt-6 p-4 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 max-w-md mx-auto">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-yellow-400 font-semibold">✨ How to play:</span> Click a colored box to select it, 
          then click an adjacent LEFT or RIGHT space to move it. Gravity pulls all boxes down! When two boxes with the same shape 
          touch, they vanish in a burst of magic! Navigate around the gray blocker boxes - they can't be moved. Clear all colored boxes to win!
        </p>
      </div>
    </div>
  );
};

export default GameControls;
