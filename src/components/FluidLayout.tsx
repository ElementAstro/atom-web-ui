// src/components/FluidLayout.tsx
import React, {
  useState,
  useRef,
  useEffect,
  TouchEvent,
  MouseEvent,
  KeyboardEvent,
} from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface FluidLayoutProps {
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
  onSidebarToggle?: (isOpen: boolean) => void;
  customClass?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "ocean" | "sunset";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  sidebarBackgroundColor?: string;
  mainBackgroundColor?: string;
  sidebarTextColor?: string;
  mainTextColor?: string;
  sidebarWidth?: string;
  mainWidth?: string;
}

const FluidLayout: React.FC<FluidLayoutProps> = ({
  sidebarContent,
  mainContent,
  onSidebarToggle,
  customClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  autoClose = false,
  autoCloseDuration = 5000,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Fluid Layout",
  sidebarBackgroundColor = "bg-gray-800",
  mainBackgroundColor = "bg-gray-900",
  sidebarTextColor = "text-white",
  mainTextColor = "text-white",
  sidebarWidth = "25%",
  mainWidth = "75%",
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    if (deltaX > 0 && !isSidebarOpen) {
      sidebarRef.current!.style.transform = `translateX(${deltaX}px)`;
    } else if (deltaX < 0 && isSidebarOpen) {
      sidebarRef.current!.style.transform = `translateX(${deltaX}px)`;
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
    sidebarRef.current!.style.transform = "";
  };

  const handleResizeStart = (e: MouseEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    document.addEventListener(
      "mousemove",
      handleResize as unknown as EventListener
    );
    document.addEventListener("mouseup", handleResizeEnd as EventListener);
  };

  const handleResize = (e: MouseEvent) => {
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(200, sidebarRef.current!.offsetWidth + deltaX);
    sidebarRef.current!.style.width = `${newWidth}px`;
    startX.current = e.clientX;
  };

  const handleResizeEnd = () => {
    document.removeEventListener(
      "mousemove",
      handleResize as unknown as EventListener
    );
    document.removeEventListener("mouseup", handleResizeEnd as EventListener);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset";

  const themeClasses: Record<ThemeKeys, string> = {
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
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <aside
        ref={sidebarRef}
        className={`${sidebarBackgroundColor} ${sidebarTextColor} p-4 transition-transform duration-300 ease-in-out transform ${animation} ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: sidebarWidth }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">
            {icon && <span className="mr-2">{icon}</span>}
            Sidebar
          </h2>
          <button
            className="md:hidden"
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

      <main
        className={`flex-grow ${mainBackgroundColor} ${mainTextColor} p-4 ${
          isFullscreen ? "w-full h-full" : ""
        }`}
        style={{ width: mainWidth }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Main Content</h1>
          <div className="flex space-x-2">
            <button onClick={handleFullscreenToggle} title="Toggle Fullscreen">
              {isFullscreen ? (
                <AiOutlineFullscreenExit />
              ) : (
                <AiOutlineFullscreen />
              )}
            </button>
            <button
              className="md:hidden"
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
