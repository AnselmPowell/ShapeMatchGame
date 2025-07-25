import React from 'react';

/**
 * Victory celebration modal component
 */
const VictoryModal = ({ moves, onPlayAgain, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl text-center border border-white/20 transform animate-bounce">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            INCREDIBLE!
          </h2>
          <p className="text-xl text-white mb-4">You cleared all the shapes!</p>
          <div className="text-gray-200 mb-6">
            <p>🎯 Total Moves: <span className="font-bold text-cyan-300">{moves}</span></p>
          </div>
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            🚀 Play Again
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50"></div>
      </div>
    </div>
  );
};

export default VictoryModal;
