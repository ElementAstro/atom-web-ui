// src/components/Notification.tsx
import React, { useEffect, useState, ReactNode } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
  onOpen?: () => void;
  onCloseComplete?: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  icon?: ReactNode;
  closable?: boolean;
  autoClose?: boolean;
  pauseOnHover?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  fullscreen?: boolean;
  customClass?: string; // 新增属性
  customIconClass?: string; // 新增属性
  customButtonClass?: string; // 新增属性
}

const Notification: React.FC<NotificationProps> = ({
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
  customClass = "", // 解构新增属性
  customIconClass = "", // 解构新增属性
  customButtonClass = "", // 解构新增属性
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
    let timer: NodeJS.Timeout;
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
    let timer: NodeJS.Timeout;
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

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    forest: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed: "bg-red-100 text-red-900 border-red-300",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} ${bgColor} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } text-white p-4 rounded-lg shadow-lg flex justify-between items-center ${animation} hover:scale-105 hover:shadow-neon border-${borderWidth} ${
        fullscreen ? "w-full h-full" : ""
      } ${customClass}`}
      style={{ maxWidth: "90%", width: "auto" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={tooltip}
    >
      {icon && <span className={`mr-2 ${customIconClass}`}>{icon}</span>}
      <span>{message}</span>
      {closable && (
        <button
          className={`ml-4 text-xl font-bold hover:text-red-500 transition duration-300 ${customButtonClass}`}
          onClick={onClose}
        >
          ✕
        </button>
      )}
      <style>{`
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
