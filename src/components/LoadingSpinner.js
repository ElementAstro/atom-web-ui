// src/components/LoadingSpinner.js
import React, { useEffect } from "react";
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
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

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
  };

  useEffect(() => {
    if (onStart) onStart();
    return () => {
      if (onStop) onStop();
    };
  }, [onStart, onStop]);

  const labelClasses = {
    top: "flex-col-reverse",
    bottom: "flex-col",
    left: "flex-row-reverse",
    right: "flex-row",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy: "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`flex justify-center items-center ${labelClasses[labelPosition]} ${fullscreen ? "fixed inset-0 z-50" : ""} ${themeClasses[theme || currentTheme]}`}
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
    </div>
  );
};

export default LoadingSpinner;