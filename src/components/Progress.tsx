// src/components/Progress.tsx
import React, { useEffect, useState } from "react";
import {
  AiOutlinePause,
  AiOutlinePlayCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface ProgressProps {
  value: number;
  max: number;
  onProgressComplete?: () => void;
  onProgressChange?: (progress: number) => void;
  customClass?: string;
  customProgressClass?: string;
  customTextClass?: string;
  customButtonClass?: string;
  color?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "sunset" | "ocean";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max,
  onProgressComplete,
  onProgressChange,
  customClass = "",
  customProgressClass = "",
  customTextClass = "",
  customButtonClass = "",
  color = "linear-gradient(to right, rgba(29, 78, 216, 1), rgba(6, 182, 212, 1))",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-500 ease-in-out",
  icon = null,
  fullscreen = false,
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [progressValue, setProgressValue] = useState(value);
  const [isPaused, setIsPaused] = useState(false);
  const { theme: currentTheme } = useTheme();

  const progressPercentage = Math.min((progressValue / max) * 100, 100);

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progressPercentage);
    }
    if (progressPercentage === 100 && onProgressComplete) {
      onProgressComplete();
    }
  }, [progressPercentage, onProgressChange, onProgressComplete]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleClose = () => {
    setProgressValue(0);
    if (onProgressComplete) {
      onProgressComplete();
    }
  };

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
      className={`relative w-full bg-gray-300 rounded-full shadow-lg overflow-hidden ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } border-${borderWidth}`}
    >
      <div
        className={`h-4 rounded-full ${animation} ${customProgressClass}`}
        style={{
          width: `${progressPercentage}%`,
          background: color,
        }}
      />
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 text-white font-bold animate-pulse ${customTextClass}`}
      >
        {progressValue}/{max}
      </span>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        {isPaused ? (
          <button
            onClick={handleResume}
            className={`text-white hover:text-green-500 transition duration-300 ${customButtonClass} ${hoverColor} ${activeColor} ${disabledColor} ${hoverAnimation}`}
            title={tooltip}
          >
            {icon || <AiOutlinePlayCircle />}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className={`text-white hover:text-yellow-500 transition duration-300 ${customButtonClass} ${hoverColor} ${activeColor} ${disabledColor} ${hoverAnimation}`}
            title={tooltip}
          >
            {icon || <AiOutlinePause />}
          </button>
        )}
        <button
          onClick={handleClose}
          className={`text-white hover:text-red-500 transition duration-300 ${customButtonClass} ${hoverColor} ${activeColor} ${disabledColor} ${hoverAnimation}`}
          title={tooltip}
        >
          {icon || <AiOutlineClose />}
        </button>
      </div>
    </div>
  );
};

export default Progress;
