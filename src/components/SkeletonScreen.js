import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineFullscreen
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const SkeletonScreen = ({
  width = "100%",
  height = "20px",
  shape = "rectangle",
  className = "",
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  draggable = false,
  maximizable = false,
  onMaximize,
  onMinimize,
  closable = false,
  autoHide = false,
  hideAfter = 3000,
  showProgress = false,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "animate-pulse", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  iconColor = "text-gray-400", // 新增属性
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const timerRef = useRef(null);

  useEffect(() => {
    if (autoHide) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsVisible(false);
            return 100;
          }
          return prev + 100 / (hideAfter / 100);
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoHide, hideAfter]);

  const shapeClasses = {
    rectangle: "rounded",
    circle: "rounded-full",
  };

  const handleDragStart = (e) => {
    if (draggable) {
      const rect = e.target.getBoundingClientRect();
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        })
      );
    }
  };

  const handleDrop = (e) => {
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      e.target.style.left = `${e.clientX - data.offsetX}px`;
      e.target.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  const handleMaximize = (e) => {
    if (maximizable) {
      e.target.style.width = "100%";
      e.target.style.height = "100%";
      if (onMaximize) onMaximize();
    }
  };

  const handleMinimize = (e) => {
    if (maximizable) {
      e.target.style.width = width;
      e.target.style.height = height;
      if (onMinimize) onMinimize();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  if (!isVisible) return null;

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`relative ${animation} ${shapeClasses[shape]} ${className} ${
        themeClasses[theme || currentTheme]
      } border-${borderWidth}`}
      style={{ width, height }}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      onDoubleClick={onDoubleClick}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      draggable={draggable}
      role="status"
      aria-label="Loading..."
    >
      {maximizable && (
        <button
          onClick={handleMaximize}
          className={`absolute top-2 right-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 transition duration-300 ${iconColor}`}
          title={tooltip}
        >
          {icon || <AiOutlineExpand />}
        </button>
      )}
      {maximizable && (
        <button
          onClick={handleMinimize}
          className={`absolute top-2 right-16 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 transition duration-300 ${iconColor}`}
          title={tooltip}
        >
          {icon || <AiOutlineCompress />}
        </button>
      )}
      {closable && (
        <button
          onClick={handleClose}
          className={`absolute top-2 right-8 bg-red-500 text-white p-1 rounded hover:bg-red-700 transition duration-300 ${iconColor}`}
          title={tooltip}
        >
          {icon || <AiOutlineClose />}
        </button>
      )}
      {fullscreen && (
        <button
          onClick={handleFullscreen}
          className={`absolute top-2 right-24 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 transition duration-300 ${iconColor}`}
          title={tooltip}
        >
          {icon || <AiOutlineFullscreen />}
        </button>
      )}
      {showProgress && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

export default SkeletonScreen;
