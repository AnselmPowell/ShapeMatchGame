import React from 'react';

/**
 * Animated background particles for visual effect
 */
const BackgroundParticles = () => {
  const particles = [...Array(20)].map((_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
};

export default BackgroundParticles;
