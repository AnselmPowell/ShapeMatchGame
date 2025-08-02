import React from 'react';

/**
 * Failure modal component for when player runs out of moves
 */
const FailureModal = ({ 
  isVisible, 
  onRetry,
  remainingBoxes,
  currentBoardIndex
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
        
        {/* Main modal content */}
        <div className="relative z-10 bg-gradient-to-br from-red-600 to-orange-600 p-8 rounded-2xl shadow-2xl text-center border border-white/20 transform max-w-md mx-4">
          {/* Failure Icon */}
          <div className="text-6xl mb-4">
            ⏱️
          </div>
          
          {/* Failure Title */}
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            OUT OF MOVES!
          </h2>
          
          {/* Failure Message */}
          <p className="text-xl text-white mb-4">
            You've used all available moves for Level {currentBoardIndex + 1}!
          </p>
          
          {/* Stats Display */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
            <p className="text-gray-200 text-lg">
              📦 Shapes Left: <span className="font-bold text-red-300 text-2xl">{remainingBoxes}</span>
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onRetry}
              className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl z-20"
            >
              <span className="relative z-30">🔄 Retry Level</span>
            </button>
          </div>
          
          {/* Encouragement */}
          <p className="text-white/80 text-sm mt-4">
            Try a different approach! Think about the best move sequence! 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;