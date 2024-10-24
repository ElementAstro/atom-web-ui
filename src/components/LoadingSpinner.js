// src/components/LoadingSpinner.js
import React, { useEffect } from 'react';

const LoadingSpinner = ({ size = '10', color = 'blue', speed = 'normal', onStart, onStop }) => {
  const sizeClasses = `h-${size} w-${size}`;
  const colorClasses = `border-${color}-500`;
  const spinSpeedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast',
  };

  useEffect(() => {
    if (onStart) onStart();
    return () => {
      if (onStop) onStop();
    };
  }, [onStart, onStop]);

  return (
    <div className="flex justify-center items-center">
      <div className={`rounded-full border-b-2 ${sizeClasses} ${colorClasses} ${spinSpeedClasses[speed]} shadow-neon`} />
    </div>
  );
};

export default LoadingSpinner;