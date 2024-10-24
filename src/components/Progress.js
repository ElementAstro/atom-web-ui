// src/components/Progress.js
import React, { useEffect, useState } from "react";
import {
  AiOutlinePause,
  AiOutlinePlayCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Progress = ({
  value,
  max,
  onProgressComplete,
  onProgressChange,
  customClass = "",
  customProgressClass = "",
  customTextClass = "",
  customButtonClass = "",
  color = "linear-gradient(to right, rgba(29, 78, 216, 1), rgba(6, 182, 212, 1))",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-500 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [progressValue, setProgressValue] = useState(value);
  const [isPaused, setIsPaused] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const progressPercentage = Math.min((progressValue / max) * 100, 100); // 确保不超过100%

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progressPercentage);
    }
    if (progressPercentage === 100 && onProgressComplete) {
      onProgressComplete();
    }
  }, [progressPercentage, onProgressChange, onProgressComplete]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleClose = () => {
    setProgressValue(0);
    if (onProgressComplete) {
      onProgressComplete();
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`relative w-full bg-gray-300 rounded-full shadow-lg overflow-hidden ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]} border-${borderWidth}`}
    >
      <div
        className={`h-4 rounded-full ${animation} ${customProgressClass}`}
        style={{
          width: `${progressPercentage}%`,
          background: color, // 自定义颜色
        }}
      />
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 text-white font-bold animate-pulse ${customTextClass}`}
      >
        {progressValue}/{max}
      </span>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        {isPaused ? (
          <button
            onClick={handleResume}
            className={`text-white hover:text-green-500 transition duration-300 ${customButtonClass}`}
            title={tooltip}
          >
            {icon || <AiOutlinePlayCircle />}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className={`text-white hover:text-yellow-500 transition duration-300 ${customButtonClass}`}
            title={tooltip}
          >
            {icon || <AiOutlinePause />}
          </button>
        )}
        <button
          onClick={handleClose}
          className={`text-white hover:text-red-500 transition duration-300 ${customButtonClass}`}
          title={tooltip}
        >
          {icon || <AiOutlineClose />}
        </button>
      </div>
    </div>
  );
};

export default Progress;
