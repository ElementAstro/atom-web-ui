// src/components/Notification.js
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Notification = ({
  message,
  type,
  onClose,
  duration = 3000,
  onOpen,
  onCloseComplete,
  position = "bottom-right",
  icon,
  closable = true,
  autoClose = true,
  pauseOnHover = true,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-500 ease-in-out", // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

  useEffect(() => {
    if (onOpen) onOpen();
    let timer;
    if (autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      clearTimeout(timer); // 清除定时器
      if (onCloseComplete) onCloseComplete();
    };
  }, [onClose, duration, onOpen, onCloseComplete, autoClose]);

  useEffect(() => {
    let timer;
    if (autoClose && !isPaused) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isPaused, autoClose, duration, onClose]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  const positionClasses = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
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
      className={`fixed ${positionClasses[position]} ${bgColor} ${
        themeClasses[theme || currentTheme]
      } text-white p-4 rounded-lg shadow-lg flex justify-between items-center ${animation} hover:scale-105 hover:shadow-neon border-${borderWidth} ${
        fullscreen ? "w-full h-full" : ""
      }`}
      style={{ maxWidth: "90%", width: "auto" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={tooltip}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{message}</span>
      {closable && (
        <button
          className="ml-4 text-xl font-bold hover:text-red-500 transition duration-300"
          onClick={onClose}
        >
          ✕
        </button>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed {
            bottom: 2rem;
            right: 1rem;
            left: 1rem;
            max-width: calc(100% - 2rem);
          }
          .text-xl {
            font-size: 1.25rem;
          }
          .p-4 {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;
