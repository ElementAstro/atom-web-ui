// src/components/LoadingOverlay.js
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const LoadingOverlay = ({
  loadingText = "Loading...",
  onShow,
  onHide,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "4", // 新增属性
  animation = "animate-spin", // 新增属性
  icon = null, // 新增属性
  progress = null, // 新增属性
  onClose, // 新增属性
  closable = true, // 新增属性，默认可关闭
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (onShow) onShow();
    return () => {
      if (onHide) onHide();
    };
  }, [onShow, onHide]);

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
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 ${
        themeClasses[theme || currentTheme]
      }`}
      role="alert"
      aria-live="assertive"
      title={tooltip}
    >
      <div className="flex flex-col items-center space-y-4">
        {icon ? (
          <div className={`h-12 w-12 ${animation}`}>{icon}</div>
        ) : (
          <div
            className={`h-12 w-12 border-${borderWidth} border-gray-300 border-t-transparent rounded-full shadow-neon ${animation}`}
          ></div>
        )}
        <span className="text-white text-lg font-semibold">{loadingText}</span>
        {progress !== null && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {closable && (
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => {
              setIsVisible(false);
              onClose && onClose();
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
