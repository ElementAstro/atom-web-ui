// src/components/Card.tsx
import React, {
  useRef,
  ReactNode,
  DragEvent,
  KeyboardEvent,
  useState,
} from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Maximize2, Minimize2, X } from "lucide-react";

interface CardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  isCollapsed?: boolean;
  isMaximized?: boolean;
  draggable?: boolean;
  onToggleCollapse?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  customClass?: string;
  customHeaderClass?: string;
  customContentClass?: string;
  customFooterClass?: string;
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: ReactNode;
  headerSize?: string;
  headerBackground?: string;
  footerBackground?: string;
  headerTextColor?: string;
  footerTextColor?: string;
  resizable?: boolean;
  onResize?: (width: number, height: number) => void;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  theme?: "light" | "dark";
  bgColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  isCollapsed = false,
  isMaximized = false,
  draggable = false,
  onToggleCollapse,
  onMaximize,
  onClose,
  customClass = "",
  customHeaderClass = "",
  customContentClass = "",
  customFooterClass = "",
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  headerSize = "text-xl",
  headerBackground = "bg-gradient-to-r from-purple-900 via-pink-900 to-red-900",
  footerBackground = "bg-gray-100",
  headerTextColor = "text-white",
  footerTextColor = "text-gray-900",
  resizable = false,
  onResize,
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
  bgColor = "white", // 默认背景色
  theme = "light",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme();
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 300,
    height: 200,
  });
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [maximized, setMaximized] = useState(isMaximized);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    if (onToggleCollapse) onToggleCollapse();
  };

  const handleMaximize = () => {
    setMaximized(!maximized);
    if (onMaximize) onMaximize();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && cardRef.current) {
      e.dataTransfer.setData("text/plain", cardRef.current.id);
      setInitialPosition({
        x: cardRef.current.offsetLeft,
        y: cardRef.current.offsetTop,
      });
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

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && cardRef.current && initialPosition) {
      cardRef.current.style.left = `${initialPosition.x}px`;
      cardRef.current.style.top = `${initialPosition.y}px`;
    }
  };

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (resizable && cardRef.current) {
      const startWidth = cardRef.current.offsetWidth;
      const startHeight = cardRef.current.offsetHeight;
      const startX = e.clientX;
      const startY = e.clientY;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);
        setDimensions({ width: newWidth, height: newHeight });
        if (onResize) onResize(newWidth, newHeight);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
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
    <motion.div
      ref={cardRef}
      role="article"
      className={`border-${borderWidth} border-${borderColor} border-${borderStyle} rounded-lg ${
        shadow ? "shadow-lg" : ""
      } ${animation} ${collapsed ? "h-12 overflow-hidden" : "h-auto"} ${
        maximized ? "fixed inset-0 z-50" : ""
      } ${draggable ? "absolute" : ""} ${
        hoverEffect
          ? "hover:shadow-xl hover:shadow-neon transform hover:scale-105"
          : ""
      } ${themeClasses[theme]} ${customClass}`}
      draggable={draggable}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      title={tooltip}
      style={{
        width: dimensions.width,
        height: collapsed ? "auto" : dimensions.height,
        textTransform,
        backgroundColor: bgColor,
      }}
      whileHover={{ scale: hoverEffect ? 1.05 : 1 }}
    >
      <div
        className={`flex justify-between items-center p-4 cursor-pointer ${headerBackground} ${customHeaderClass}`}
        onClick={handleToggleCollapse}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
          e.key === "Enter" && handleToggleCollapse()
        }
        tabIndex={0}
      >
        <div className={`flex items-center ${customHeaderClass}`}>
          {icon && <span className="mr-2">{icon}</span>}
          <h2 className={`font-bold ${headerSize} ${headerTextColor}`}>
            {title}
          </h2>
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={handleToggleCollapse}
            className="text-lg text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label="Toggle Collapse"
          >
            {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </motion.button>
          <motion.button
            onClick={handleMaximize}
            className="text-lg text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={maximized ? "Minimize" : "Maximize"}
          >
            {maximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </motion.button>
          <motion.button
            onClick={handleClose}
            className="text-lg text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label="Close"
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>
      {!collapsed && (
        <motion.div
          className={`p-4 ${customContentClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
      {!collapsed && footer && (
        <motion.div
          className={`p-4 ${footerBackground} ${footerTextColor} ${customFooterClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {footer}
        </motion.div>
      )}
      {resizable && (
        <div
          data-testid="resize-handle"
          className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
          onMouseDown={handleResize}
        />
      )}
      {draggable && (
        <style>{`
          .${cardRef.current?.id} {
            position: absolute;
            top: ${initialPosition?.y || 0}px;
            left: ${initialPosition?.x || 0}px;
          }
        `}</style>
      )}
    </motion.div>
  );
};

export default Card;
