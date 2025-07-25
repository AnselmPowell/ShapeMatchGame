import React from 'react';

/**
 * Game controls and instructions component
 */
const GameControls = ({ onResetGame }) => {
  return (
    <div className="text-center">
      <button
        onClick={onResetGame}
        className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        <span className="relative z-10">🎮 New Game</span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      </button>
      
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
