// src/components/Card.tsx
import React, { useRef, ReactNode, DragEvent, KeyboardEvent } from "react";
import { useTheme } from "../context/ThemeContext";

interface CardProps {
  title: string;
  children: ReactNode;
  isCollapsed?: boolean;
  isMaximized?: boolean;
  draggable?: boolean;
  onToggleCollapse?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  customClass?: string;
  customHeaderClass?: string;
  customContentClass?: string;
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  isCollapsed = false,
  isMaximized = false,
  draggable = false,
  onToggleCollapse,
  onMaximize,
  onClose,
  customClass = "",
  customHeaderClass = "",
  customContentClass = "",
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); // 获取当前主题

  const handleToggleCollapse = () => {
    if (onToggleCollapse) onToggleCollapse();
  };

  const handleMaximize = () => {
    if (onMaximize) onMaximize();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && cardRef.current) {
      e.dataTransfer.setData("text/plain", cardRef.current.id);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && cardRef.current) {
      e.preventDefault();
      const droppedCardId = e.dataTransfer.getData("text/plain");
      const droppedCard = document.getElementById(droppedCardId);
      if (droppedCard && cardRef.current.parentNode) {
        cardRef.current.parentNode.insertBefore(
          droppedCard,
          cardRef.current.nextSibling
        );
      }
    }
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <div
      ref={cardRef}
      className={`border-${borderWidth} rounded-lg shadow-lg ${animation} ${
        isCollapsed ? "h-12" : "h-auto"
      } ${isMaximized ? "fixed inset-0 z-50" : ""} ${
        draggable ? "absolute" : ""
      } hover:shadow-xl hover:shadow-neon transform hover:scale-105 ${customClass} ${
        themeClasses[theme]
      }`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      title={tooltip}
    >
      <div
        className={`flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 ${customHeaderClass}`}
        onClick={handleToggleCollapse}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
          e.key === "Enter" && handleToggleCollapse()
        }
        tabIndex={0}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h2 className="font-bold text-xl text-white">{title}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleMaximize}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) =>
              e.key === "Enter" && handleMaximize()
            }
            className="text-lg text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button
            onClick={handleClose}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) =>
              e.key === "Enter" && handleClose()
            }
            className="text-lg text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
          >
            ✕
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className={`p-4 ${customContentClass}`}>{children}</div>
      )}
    </div>
  );
};

export default Card;
