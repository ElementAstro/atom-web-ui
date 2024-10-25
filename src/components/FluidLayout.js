import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const FluidLayout = ({
  sidebarContent,
  mainContent,
  onSidebarToggle,
  customClass = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  autoClose = false, // 新增属性
  autoCloseDuration = 5000, // 新增属性
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Fluid Layout",
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState("25%");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sidebarRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const timerRef = useRef(null);

  useEffect(() => {
    if (isSidebarOpen && autoClose) {
      timerRef.current = setTimeout(() => {
        setSidebarOpen(false);
        if (onSidebarToggle) onSidebarToggle(false);
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSidebarOpen, autoClose, autoCloseDuration, onSidebarToggle]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
    if (onSidebarToggle) onSidebarToggle(!isSidebarOpen);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    if (deltaX > 0 && !isSidebarOpen) {
      sidebarRef.current.style.transform = `translateX(${deltaX}px)`;
    } else if (deltaX < 0 && isSidebarOpen) {
      sidebarRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  };

  const handleTouchEnd = () => {
    const deltaX = currentX.current - startX.current;
    if (deltaX > 50 && !isSidebarOpen) {
      setSidebarOpen(true);
      if (onSidebarToggle) onSidebarToggle(true);
    } else if (deltaX < -50 && isSidebarOpen) {
      setSidebarOpen(false);
      if (onSidebarToggle) onSidebarToggle(false);
    }
    sidebarRef.current.style.transform = "";
  };

  const handleResizeStart = (e) => {
    startX.current = e.clientX;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResize = (e) => {
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(200, sidebarRef.current.offsetWidth + deltaX);
    setSidebarWidth(`${newWidth}px`);
    startX.current = e.clientX;
  };

  const handleResizeEnd = () => {
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:min-h-screen ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-gray-800 p-4 transition-transform duration-300 ease-in-out transform ${animation} ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: sidebarWidth }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">
            {icon && <span className="mr-2">{icon}</span>}
            Sidebar
          </h2>
          <button
            className="text-white md:hidden"
            onClick={handleSidebarToggle}
            title={tooltip}
          >
            {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
        <div className="space-y-2">{sidebarContent}</div>
        <div
          className={`absolute top-0 right-0 h-full w-2 cursor-col-resize border-${borderWidth}`}
          onMouseDown={handleResizeStart}
        ></div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-grow bg-gray-900 p-4 ${
          isFullscreen ? "w-full h-full" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-2xl">Main Content</h1>
          <div className="flex space-x-2">
            <button
              className="text-white"
              onClick={handleFullscreenToggle}
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <AiOutlineFullscreenExit />
              ) : (
                <AiOutlineFullscreen />
              )}
            </button>
            <button
              className="text-white md:hidden"
              onClick={handleSidebarToggle}
              title={tooltip}
            >
              {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
        {mainContent}
      </main>
    </div>
  );
};

export default FluidLayout;
