import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

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
  animationType?: "fade" | "slide" | "scale" | "rotate";
  animationDuration?: number;
  animationDelay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  hoverAnimation?: boolean;
  hoverScale?: number;
  hoverRotate?: number;
  hoverShadow?: boolean;
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
  animationType = "fade",
  animationDuration = 0.3,
  animationDelay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
  hoverAnimation = true,
  hoverScale = 1.05,
  hoverRotate = 0,
  hoverShadow = true,
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
      className={`text-gray-400 ${customClass} ${themeClasses[theme]} relative`}
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
      <AnimatePresence>
        <motion.ol
          className={`flex space-x-2 ${responsive ? "flex-wrap" : ""}`}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: staggerChildren ? staggerDelay : 0,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {displayedItems.map((item, index) => (
            <motion.li
              key={item.label}
              className="flex items-center"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              onAnimationEnd={onAnimationEnd}
              variants={{
                hidden: {
                  opacity: 0,
                  y: animationType === "slide" ? 20 : 0,
                  scale: animationType === "scale" ? 0.8 : 1,
                  rotate: animationType === "rotate" ? 90 : 0,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: animationDuration,
                    delay: animationDelay,
                  },
                },
              }}
              whileHover={
                hoverAnimation
                  ? {
                      scale: hoverScale || 1.05,
                      rotate: hoverRotate || 0,
                      boxShadow: hoverShadow
                        ? "0 5px 15px rgba(0,0,0,0.1)"
                        : "none",
                    }
                  : undefined
              }
            >
              {index > 0 && <span className="mx-2">{separator}</span>}
              {item.link ? (
                <Link
                  to={item.link}
                  className={`transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${variantClasses[variant]} ${animation}`}
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
                <div
                  className={`absolute ${tooltipClasses[tooltipPosition]} bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
                >
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
            </motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </nav>
  );
};

export default Breadcrumbs;
