// src/components/Breadcrumbs.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface BreadcrumbItem {
  label: string;
  link: string | null;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onItemClick?: (item: BreadcrumbItem) => void;
  variant?: "primary" | "secondary" | "alert" | "success";
  separator?: string;
  customClass?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  maxItems?: number;
  responsive?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  animation?: string;
  showIcon?: boolean;
  iconPosition?: "left" | "right";
  showProgress?: boolean;
  progressColor?: string;
  progressHeight?: string;
  showBadge?: boolean;
  badgeContent?: string;
  badgeColor?: string;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  badgeSize?: "small" | "medium" | "large";
  badgeShape?: "circle" | "square";
  badgeBorderColor?: string;
  badgeBorderWidth?: string;
}

type Theme =
  | "light"
  | "dark"
  | "astronomy"
  | "eyeCare"
  | "ocean"
  | "sunset"
  | "astronomyDarkRed";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onItemClick,
  variant = "primary",
  separator = "/",
  customClass = "",
  icon = null,
  tooltip = "",
  maxItems = 5,
  responsive = true,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  showTooltip = false,
  tooltipPosition = "top",
  animation = "transform transition-transform duration-300 ease-in-out",
  showIcon = true,
  iconPosition = "left",
  showProgress = false,
  progressColor = "bg-blue-500",
  progressHeight = "h-1",
  showBadge = false,
  badgeContent = "",
  badgeColor = "red",
  badgePosition = "top-right",
  badgeSize = "small",
  badgeShape = "circle",
  badgeBorderColor = "white",
  badgeBorderWidth = "1",
}) => {
  const location = useLocation();
  const { theme } = useTheme() as { theme: Theme };

  const variantClasses = {
    primary: "text-gray-400 hover:text-white",
    secondary: "text-gray-500 hover:text-gray-300",
    alert: "text-red-500 hover:text-red-300",
    success: "text-green-500 hover:text-green-300",
  };

  const themeClasses: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
    ocean: "bg-blue-100 text-blue-900",
    sunset: "bg-orange-100 text-orange-900",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white",
  };

  const displayedItems =
    maxItems && items.length > maxItems
      ? [
          ...items.slice(0, Math.floor(maxItems / 2)),
          { label: "...", link: null },
          ...items.slice(items.length - Math.floor(maxItems / 2)),
        ]
      : items;

  const tooltipClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  const badgePositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const badgeSizeClasses = {
    small: "w-4 h-4 text-xs",
    medium: "w-6 h-6 text-sm",
    large: "w-8 h-8 text-md",
  };

  const badgeShapeClass =
    badgeShape === "circle" ? "rounded-full" : "rounded-lg";

  return (
    <nav
      className={`text-gray-400 ${customClass} ${themeClasses[theme]}`}
      aria-label="Breadcrumb"
    >
      {showProgress && (
        <div className={`absolute top-0 left-0 w-full ${progressHeight}`}>
          <div
            className={`${progressColor} h-full`}
            style={{
              width: `${
                ((location.pathname.split("/").length - 1) * 100) / items.length
              }%`,
            }}
          ></div>
        </div>
      )}
      <ol className={`flex space-x-2 ${responsive ? "flex-wrap" : ""}`}>
        {displayedItems.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onAnimationEnd={onAnimationEnd}
          >
            {index > 0 && <span className="mx-2">{separator}</span>}
            {item.link ? (
              <Link
                to={item.link}
                className={`transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon ${variantClasses[variant]} ${animation}`}
                aria-current={
                  location.pathname === item.link ? "page" : undefined
                }
                onClick={() => onItemClick && onItemClick(item)}
                title={tooltip}
              >
                {showIcon && icon && iconPosition === "left" && (
                  <span className="mr-2">{icon}</span>
                )}
                {item.label}
                {showIcon && icon && iconPosition === "right" && (
                  <span className="ml-2">{icon}</span>
                )}
              </Link>
            ) : (
              <span className="text-gray-200" title={tooltip}>
                {showIcon && icon && iconPosition === "left" && (
                  <span className="mr-2">{icon}</span>
                )}
                {item.label}
                {showIcon && icon && iconPosition === "right" && (
                  <span className="ml-2">{icon}</span>
                )}
              </span>
            )}
            {showTooltip && (
              <div className={`tooltip ${tooltipClasses[tooltipPosition]}`}>
                {tooltip}
              </div>
            )}
            {showBadge && (
              <span
                className={`absolute ${badgePositionClasses[badgePosition]} flex items-center justify-center ${badgeSizeClasses[badgeSize]} bg-${badgeColor}-500 border-${badgeBorderWidth} border-${badgeBorderColor} ${badgeShapeClass}`}
              >
                {badgeContent}
              </span>
            )}
          </li>
        ))}
      </ol>
      <style>{`
        nav {
          background: linear-gradient(to right, #4a5568, #2d3748);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        li {
          transition: all 0.3s ease;
        }
        li:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          white-space: nowrap;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tooltip-top {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        }
        .tooltip-bottom {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
        }
        .tooltip-left {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 0.5rem;
        }
        .tooltip-right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        }
        li:hover .tooltip {
          opacity: 1;
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;
