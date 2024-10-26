// src/components/ProgressBar.tsx
import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface ProgressBarProps {
  progress: number;
  onProgressComplete?: () => void;
  onProgressChange?: (progress: number) => void;
  label?: string;
  size?: "small" | "medium" | "large";
  showPercentage?: boolean;
  showLabel?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  variant?: "info" | "success" | "warning" | "error";
  height?: "small" | "medium" | "large";
  striped?: boolean;
  animated?: boolean;
  customClass?: string;
  customProgressClass?: string;
  customLabelClass?: string;
  customPercentageClass?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "sunset" | "ocean";
  tooltip?: string;
  borderWidth?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  customTooltipClass?: string; // 新增属性
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  onProgressComplete,
  onProgressChange,
  label,
  size = "medium",
  showPercentage = true,
  showLabel = true,
  showTooltip = false,
  tooltipText = "",
  onHover,
  onFocus,
  onBlur,
  variant = "info",
  height = "medium",
  striped = false,
  animated = false,
  customClass = "",
  customProgressClass = "",
  customLabelClass = "",
  customPercentageClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  icon = null,
  fullscreen = false,
  customTooltipClass = "", // 解构新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const getBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const sizeClasses = {
    small: "h-4",
    medium: "h-6",
    large: "h-8",
  };

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
    if (progress === 100 && onProgressComplete) {
      onProgressComplete();
    }
  }, [progress, onProgressChange, onProgressComplete]);

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
  };

  return (
    <div
      className={`relative w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden flex items-center ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } border-${borderWidth}`}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ height: sizeClasses[height] }}
      title={showTooltip ? tooltipText || `${progress}%` : tooltip}
    >
      <div
        className={`${getBgColor()} ${
          sizeClasses[size]
        } rounded-l-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-neon ${
          striped ? "bg-stripes" : ""
        } ${animated ? "animate-stripes" : ""} ${customProgressClass}`}
        style={{ width: `${progress}%` }}
      >
        {icon && (
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
      {showPercentage && (
        <div
          className={`absolute top-0 left-0 right-0 text-center text-white font-semibold animate-pulse ${customPercentageClass}`}
        >
          {progress}%
        </div>
      )}
      {showLabel && label && (
        <div
          className={`absolute top-0 left-0 right-0 text-center text-white font-semibold mt-6 ${customLabelClass}`}
        >
          {label}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .${sizeClasses.small} {
            height: 2rem;
          }
          .${sizeClasses.medium} {
            height: 3rem;
          }
          .${sizeClasses.large} {
            height: 4rem;
          }
          .${customPercentageClass}, .${customLabelClass} {
            font-size: 0.75rem;
          }
        }
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }
        .animate-stripes {
          animation: move-stripes 1s linear infinite;
        }
        @keyframes move-stripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
