// src/components/LoadMore.js
import React from "react";
import LoadingSpinner from "./LoadingSpinner"; // 确保已创建并导入.LoadingSpinner组件
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const LoadMore = ({
  onClick,
  loading,
  onHover,
  onFocus,
  onBlur,
  disabled = false,
  icon = null,
  tooltip = "",
  variant = "primary",
  size = "medium",
  theme, // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  iconPosition = "left", // 新增属性
  fullWidth = false, // 新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white",
    secondary: "bg-gray-700 text-white",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-md",
    large: "px-6 py-3 text-lg",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`flex items-center ${variantClasses[variant]} ${
          sizeClasses[size]
        } rounded-lg shadow-lg ${animation} ${
          loading || disabled ? "cursor-not-allowed opacity-50" : ""
        } ${fullWidth ? "w-full" : ""} ${
          themeClasses[theme || currentTheme]
        } border-${borderWidth}`}
        disabled={loading || disabled}
        title={tooltip}
      >
        {loading ? (
          <>
            <LoadingSpinner size="6" color="white" speed="fast" />{" "}
            {/* 显示加载指示器 */}
            <span className="ml-2 animate-pulse">加载中...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            <span>加载更多</span>
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </>
        )}
      </button>
      <style jsx>{`
        @media (max-width: 640px) {
          button {
            width: 100%;
            padding: 0.5rem 1rem;
          }
        }
        @media (min-width: 640px) {
          button {
            width: auto;
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadMore;
