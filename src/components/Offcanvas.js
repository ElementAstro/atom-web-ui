import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext
import {
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";

const Offcanvas = ({
  isOpen,
  onClose,
  onOpen,
  onCloseComplete,
  children,
  customClass = "",
  closeButton = true,
  closeButtonContent = "Close",
  draggable = false,
  maximizable = false,
  direction = "right", // 新增方向属性
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = <AiOutlineClose />, // 新增属性
  fullscreen = false, // 新增属性
  autoClose = false, // 新增属性
  autoCloseDuration = 5000, // 新增属性
  iconColor = "text-gray-400", // 新增属性
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  ariaLabel = "Offcanvas",
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const offcanvasRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
    if (!isOpen && onCloseComplete) {
      onCloseComplete();
    }
  }, [isOpen, onOpen, onCloseComplete]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && autoClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  const handleDragStart = (e) => {
    if (draggable) {
      const rect = offcanvasRef.current.getBoundingClientRect();
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
      offcanvasRef.current.style.left = `${e.clientX - data.offsetX}px`;
      offcanvasRef.current.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
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

  const directionClasses = {
    right: "right-0 top-0 h-full w-64",
    left: "left-0 top-0 h-full w-64",
    top: "top-0 left-0 w-full h-64",
    bottom: "bottom-0 left-0 w-full h-64",
  };

  const transformClasses = {
    right: isOpen ? "translate-x-0" : "translate-x-full",
    left: isOpen ? "translate-x-0" : "-translate-x-full",
    top: isOpen ? "translate-y-0" : "-translate-y-full",
    bottom: isOpen ? "translate-y-0" : "translate-y-full",
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
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        ref={offcanvasRef}
        className={`fixed ${
          directionClasses[direction]
        } shadow-lg transform transition-transform duration-300 ${
          transformClasses[direction]
        } ${isMaximized ? "w-full h-full" : ""} ${customClass} ${
          themeClasses[theme || currentTheme]
        } border-${borderWidth} ${animation}`}
        onClick={(e) => e.stopPropagation()}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onAnimationEnd={onAnimationEnd}
        onDoubleClick={onDoubleClick}
        aria-label={ariaLabel}
      >
        {closeButton && (
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 ${iconColor} hover:text-gray-400`}
            title={tooltip}
          >
            {icon}
          </button>
        )}
        {maximizable && (
          <button
            onClick={handleMaximize}
            className={`absolute top-4 right-16 ${iconColor} hover:text-gray-400`}
          >
            {isMaximized ? <AiOutlineCompress /> : <AiOutlineExpand />}
          </button>
        )}
        {fullscreen && (
          <button
            onClick={handleFullscreen}
            className={`absolute top-4 right-28 ${iconColor} hover:text-gray-400`}
          >
            {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </button>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Offcanvas;
