import React from 'react';

/**
 * Game statistics display component
 */
const GameStats = ({ moves, remainingBoxes }) => {
  const statsConfig = [
    { 
      label: 'Moves', 
      value: moves, 
      color: 'from-green-500 to-emerald-500', 
      icon: '🎯' 
    },
    { 
      label: 'Left', 
      value: remainingBoxes, 
      color: 'from-red-500 to-pink-500', 
      icon: '📦' 
    }
  ];

  return (
    <div className="flex justify-center gap-6 mb-6">
      {statsConfig.map((stat, i) => (
        <div key={i} className="relative group">
          <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
            <div className="text-white text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs opacity-90">{stat.label}</div>
            </div>
          </div>
          <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
        </div>
      ))}
    </div>
  );
};

export default GameStats;
