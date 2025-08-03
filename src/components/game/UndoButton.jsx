import React from 'react';

/**
 * Undo button component with availability state
 */
const UndoButton = ({ onUndo, isAvailable }) => {
  return (
    <button
      onClick={onUndo}
      disabled={!isAvailable}
      className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300
        ${isAvailable 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 hover:shadow-lg transform' 
          : 'bg-gradient-to-r from-gray-400 to-gray-500 opacity-50 cursor-not-allowed'
        }`}
      title={isAvailable ? "Undo your last move" : "You've already used undo for this level"}
    >
      ↩️ Undo Move
    </button>
  );
};

export default UndoButton;