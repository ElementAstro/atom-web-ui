// src/components/Progress.js
import React, { useEffect } from "react";

const Progress = ({ value, max, onProgressComplete, onProgressChange }) => {
  const progressPercentage = Math.min((value / max) * 100, 100); // 确保不超过100%

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progressPercentage);
    }
    if (progressPercentage === 100 && onProgressComplete) {
      onProgressComplete();
    }
  }, [progressPercentage, onProgressChange, onProgressComplete]);

  return (
    <div className="relative w-full bg-gray-300 rounded-full shadow-lg overflow-hidden">
      <div
        className={`h-4 rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-neon`}
        style={{
          width: `${progressPercentage}%`,
          background: `linear-gradient(to right, rgba(29, 78, 216, 1), rgba(6, 182, 212, 1))`, // 渐变效果
        }}
      />
      <span className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold animate-pulse">
        {value}/{max}
      </span>
    </div>
  );
};

export default Progress;
