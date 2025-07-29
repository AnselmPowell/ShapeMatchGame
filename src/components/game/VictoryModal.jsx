import React from 'react';

/**
 * Victory celebration modal component
 */
const VictoryModal = ({ 
  moves, 
  onPlayAgain, 
  onNextBoard,
  isVisible, 
  boardMode, 
  currentBoardIndex, 
  totalBoards 
}) => {
  if (!isVisible) return null;

  const isLastLevel = currentBoardIndex >= totalBoards - 1;

  const handleNextBoard = () => {
    if (boardMode === 'custom' && onNextBoard && !isLastLevel) {
      onNextBoard();
    } else {
      onPlayAgain();
    }
  };

  const getPerformanceMessage = (moves) => {
    if (moves <= 3) return { text: "🏆 PERFECT!", color: "text-yellow-300" };
    if (moves <= 6) return { text: "🌟 EXCELLENT!", color: "text-green-300" };
    if (moves <= 10) return { text: "👍 GREAT JOB!", color: "text-blue-300" };
    return { text: "✨ WELL DONE!", color: "text-purple-300" };
  };

  const performance = getPerformanceMessage(moves);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Background glow effect - BEHIND the main content */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
        
        {/* Main modal content - IN FRONT with higher z-index */}
        <div className="relative z-10 bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl text-center border border-white/20 transform max-w-md mx-4">
          {/* Celebration Icons */}
          <div className="text-6xl mb-4">
            {isLastLevel ? '🏆' : '🎉'}
          </div>
          
          {/* Victory Title */}
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            {isLastLevel ? 'ALL LEVELS COMPLETE!' : 'LEVEL COMPLETE!'}
          </h2>
          
          {/* Success Message */}
          <p className="text-xl text-white mb-4">
            {isLastLevel ? 'You mastered all challenges! 🎓' : 'Amazing! You cleared all the shapes! 🌟'}
          </p>
          
          {/* Level Info - Show current level if in custom mode */}
          {boardMode === 'custom' && (
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/10">
              <p className="text-white font-semibold">
                ✅ Level {currentBoardIndex + 1} Complete!
              </p>
            </div>
          )}
          
          {/* Stats Display */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
            <p className="text-gray-200 text-lg mb-2">
              🎯 Moves Used: <span className="font-bold text-cyan-300 text-2xl">{moves}</span>
            </p>
            <p className={`text-lg font-bold ${performance.color}`}>
              {performance.text}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            {/* Primary Action Button - Next Level or New Game */}
            {!isLastLevel && boardMode === 'custom' ? (
              <button
                onClick={handleNextBoard}
                className="relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl z-20 min-w-0"
              >
                <span className="relative z-30">⏭️ Next Level</span>
              </button>
            ) : (
              <button
                onClick={onPlayAgain}
                className="relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl z-20 min-w-0"
              >
                <span className="relative z-30">
                  {boardMode === 'custom' ? '🔄 Play Again' : '🎲 New Game'}
                </span>
              </button>
            )}
            
            {/* Secondary Action Button - Restart Current */}
            <button
              onClick={onPlayAgain}
              className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl z-20 min-w-0"
            >
              <span className="relative z-30">🔄 Retry Level</span>
            </button>
          </div>
          
          {/* Additional Encouragement */}
          <p className="text-white/80 text-sm mt-4">
            {isLastLevel 
              ? 'You\'re a Shape Match master! 🎯' 
              : boardMode === 'custom' 
                ? 'Ready for the next challenge? 🚀' 
                : 'Try another random puzzle! 🎲'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
