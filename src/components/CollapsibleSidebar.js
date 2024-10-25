// src/components/CollapsibleSidebar.js
import React, { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const CollapsibleSidebar = ({
  items,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-all duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Collapsible sidebar",
  draggable = false,
  resizable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const sidebarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarSize, setSidebarSize] = useState({
    width: 256,
    height: "100%",
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDragStart = (e) => {
    if (draggable) {
      setIsDragging(true);
      e.dataTransfer.setData("text/plain", sidebarRef.current.id);
    }
  };

  const handleDrop = (e) => {
    if (draggable) {
      e.preventDefault();
      const droppedSidebarId = e.dataTransfer.getData("text/plain");
      const droppedSidebar = document.getElementById(droppedSidebarId);
      sidebarRef.current.parentNode.insertBefore(
        droppedSidebar,
        sidebarRef.current.nextSibling
      );
      setIsDragging(false);
    }
  };

  const handleResizeStart = (e) => {
    if (resizable) {
      setIsResizing(true);
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", handleResizeEnd);
    }
  };

  const handleResize = (e) => {
    if (isResizing) {
      setSidebarSize({
        width: e.clientX - sidebarRef.current.offsetLeft,
        height: sidebarRef.current.offsetHeight,
      });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
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
      ref={sidebarRef}
      className={`flex ${animation} ${isOpen ? "w-64" : "w-16"} h-full ${
        themeClasses[theme || currentTheme]
      } ${fullscreen ? "w-full h-full" : ""} border-${borderWidth}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{ width: sidebarSize.width, height: sidebarSize.height }}
    >
      <div
        className={`flex flex-col p-4 space-y-4 overflow-hidden ${animation} ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-gray-300 rounded p-2 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-16 bg-gray-300 rounded-l hover:bg-gray-400"
        title={tooltip}
      >
        {icon || (isOpen ? "◀" : "▶")}
      </button>
      {resizable && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
          onMouseDown={handleResizeStart}
        ></div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .w-64 {
            width: 16rem;
          }
          .w-16 {
            width: 4rem;
          }
          .h-full {
            height: 100%;
          }
          .p-4 {
            padding: 1rem;
          }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(1rem * var(--tw-space-y-reverse));
          }
        }
      `}</style>
    </div>
  );
};

export default CollapsibleSidebar;
