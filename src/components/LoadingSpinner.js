// src/components/LoadingSpinner.js
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const LoadingSpinner = ({
  size = "10",
  color = "blue",
  speed = "normal",
  onStart,
  onStop,
  label = "",
  labelPosition = "bottom",
  thickness = "2",
  backgroundColor = "transparent",
  animation = "spin",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  progress = null, // 新增属性
  onClose, // 新增属性
  customAnimation = "", // 新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const [isVisible, setIsVisible] = useState(true);

  const sizeClasses = `h-${size} w-${size}`;
  const colorClasses = `border-${color}-500`;
  const thicknessClasses = `border-${thickness}`;
  const backgroundColorClasses = `bg-${backgroundColor}`;
  const spinSpeedClasses = {
    slow: "animate-spin-slow",
    normal: "animate-spin",
    fast: "animate-spin-fast",
  };
  const animationClasses = {
    spin: spinSpeedClasses[speed],
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    custom: customAnimation,
  };

  useEffect(() => {
    if (onStart) onStart();
    return () => {
      if (onStop) onStop();
    };
  }, [onStart, onStop]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && onClose) {
      setIsVisible(false);
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const labelClasses = {
    top: "flex-col-reverse",
    bottom: "flex-col",
    left: "flex-row-reverse",
    right: "flex-row",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300", // 新增主题
    sunset: "bg-orange-100 text-orange-900 border-orange-300", // 新增主题
  };

  if (!isVisible) return null;

  return (
    <div
      className={`flex justify-center items-center ${
        labelClasses[labelPosition]
      } ${fullscreen ? "fixed inset-0 z-50" : ""} ${
        themeClasses[theme || currentTheme]
      }`}
      title={tooltip}
    >
      {icon ? (
        <div className={`h-${size} w-${size} ${animationClasses[animation]}`}>
          {icon}
        </div>
      ) : (
        <div
          className={`rounded-full ${backgroundColorClasses} ${thicknessClasses} ${sizeClasses} ${colorClasses} ${animationClasses[animation]} shadow-neon border-${borderWidth}`}
        />
      )}
      {label && <span className="mt-2 text-white">{label}</span>}
      {progress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {onClose && (
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default LoadingSpinner;
