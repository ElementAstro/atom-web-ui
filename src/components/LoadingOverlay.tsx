// src/components/LoadingOverlay.tsx
import React, {
  useEffect,
  useState,
  FC,
  ReactNode,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface LoadingOverlayProps {
  loadingText?: string;
  onShow?: () => void;
  onHide?: () => void;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "forest"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: ReactNode;
  progress?: number | null;
  onClose?: () => void;
  closable?: boolean;
  customClass?: string; // 新增属性
  customIconClass?: string; // 新增属性
  customProgressClass?: string; // 新增属性
  customButtonClass?: string; // 新增属性
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({
  loadingText = "Loading...",
  onShow,
  onHide,
  theme,
  tooltip = "",
  borderWidth = "4",
  animation = "animate-spin",
  icon = null,
  progress = null,
  onClose,
  closable = true,
  customClass = "", // 解构新增属性
  customIconClass = "", // 解构新增属性
  customProgressClass = "", // 解构新增属性
  customButtonClass = "", // 解构新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (onShow) onShow();
    return () => {
      if (onHide) onHide();
    };
  }, [onShow, onHide]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      setIsVisible(false);
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
    };
  }, []);

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "forest"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    forest: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed: "bg-red-100 text-red-900 border-red-300",
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 ${customClass} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
      role="alert"
      aria-live="assertive"
      title={tooltip}
    >
      <div className="flex flex-col items-center space-y-4">
        {icon ? (
          <div className={`h-12 w-12 ${animation} ${customIconClass}`}>
            {icon}
          </div>
        ) : (
          <div
            className={`h-12 w-12 border-${borderWidth} border-gray-300 border-t-transparent rounded-full shadow-neon ${animation} ${customIconClass}`}
          ></div>
        )}
        <span className="text-white text-lg font-semibold">{loadingText}</span>
        {progress !== null && (
          <div
            className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ${customProgressClass}`}
          >
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {closable && (
          <button
            className={`mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${customButtonClass}`}
            onClick={() => {
              setIsVisible(false);
              onClose && onClose();
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
