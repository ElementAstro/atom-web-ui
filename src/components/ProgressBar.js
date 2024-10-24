// src/components/ProgressBar.js
import React, { useEffect } from "react";

const ProgressBar = ({
  progress,
  onProgressComplete,
  onProgressChange,
  label,
  size = "medium",
  showPercentage = true,
  onHover,
  onFocus,
  onBlur,
  variant = "info",
  height = "medium",
  customClass = "",
  customProgressClass = "",
  customLabelClass = "",
  customPercentageClass = "",
}) => {
  const getBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const sizeClasses = {
    small: "h-4",
    medium: "h-6",
    large: "h-8",
  };

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
    if (progress === 100 && onProgressComplete) {
      onProgressComplete();
    }
  }, [progress, onProgressChange, onProgressComplete]);

  return (
    <div
      className={`relative w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden ${customClass}`}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ height: sizeClasses[height] }}
    >
      <div
        className={`${getBgColor()} ${
          sizeClasses[size]
        } rounded-l-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-neon ${customProgressClass}`}
        style={{ width: `${progress}%` }}
      >
        {
          /*
          <span className="visually-hidden">{progress}%</span>
          */
        }
        
      </div>
      {showPercentage && (
        <div
          className={`absolute top-0 left-0 right-0 text-center text-white font-semibold animate-pulse ${customPercentageClass}`}
        >
          {progress}%
        </div>
      )}
      {label && (
        <div
          className={`absolute top-0 left-0 right-0 text-center text-white font-semibold mt-6 ${customLabelClass}`}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
