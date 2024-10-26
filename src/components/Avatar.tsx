// src/components/Avatar.tsx
import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  isLoading?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  borderColor?: string;
  showStatus?: boolean;
  statusColor?: string;
  shape?: "circle" | "square";
  fallbackSrc?: string;
  tooltip?: string;
  borderWidth?: string;
  statusPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  animation?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  showBadge?: boolean;
  badgeContent?: string;
  badgeColor?: string;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  badgeSize?: "small" | "medium" | "large";
  badgeShape?: "circle" | "square";
  badgeBorderColor?: string;
  badgeBorderWidth?: string;
  lazyLoad?: boolean;
  intersectionThreshold?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  showAnimation?: string;
  hideAnimation?: string;
  borderStyle?: string;
  onShow?: () => void;
  onHide?: () => void;
}

type Theme =
  | "light"
  | "dark"
  | "astronomy"
  | "eyeCare"
  | "ocean"
  | "sunset"
  | "astronomyDarkRed";

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 40,
  isLoading = false,
  onLoad,
  onError,
  borderColor = "transparent",
  showStatus = false,
  statusColor = "green",
  shape = "circle",
  fallbackSrc = "https://via.placeholder.com/150",
  tooltip = "",
  borderWidth = "2",
  statusPosition = "bottom-right",
  animation = "scale-105 shadow-lg shadow-neon",
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  showBadge = false,
  badgeContent = "",
  badgeColor = "red",
  badgePosition = "top-right",
  badgeSize = "small",
  badgeShape = "circle",
  badgeBorderColor = "white",
  badgeBorderWidth = "1",
  lazyLoad = false,
  intersectionThreshold = 0.1,
  onClick,
  showAnimation = "fadeIn",
  hideAnimation = "fadeOut",
  borderStyle = "solid",
  onShow,
  onHide,
}) => {
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const { theme } = useTheme() as { theme: Theme };
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleError = () => {
    setIsError(true);
    if (onError) onError();
  };

  useEffect(() => {
    if (!isError && onLoad) {
      onLoad();
    }
  }, [isError, onLoad]);

  useEffect(() => {
    if (lazyLoad && avatarRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
              if (onShow) onShow();
            }
          });
        },
        { threshold: intersectionThreshold }
      );

      observer.observe(avatarRef.current);
      return () => observer.disconnect();
    }
  }, [lazyLoad, intersectionThreshold, onShow]);

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  const statusPositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
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

  const themeClasses: Record<Theme, string> = {
    light: "border-gray-300",
    dark: "border-gray-700",
    astronomy: "border-gradient-to-r from-purple-900 via-blue-900 to-black",
    eyeCare: "border-green-300",
    ocean: "border-blue-300",
    sunset: "border-orange-300",
    astronomyDarkRed: "border-gradient-to-r from-red-900 via-black to-black",
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const ripple = document.createElement("span");
    const diameter = Math.max(
      e.currentTarget.clientWidth,
      e.currentTarget.clientHeight
    );
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - e.currentTarget.offsetLeft - radius}px`;
    ripple.style.top = `${e.clientY - e.currentTarget.offsetTop - radius}px`;
    ripple.classList.add("ripple");
    const rippleContainer = e.currentTarget.querySelector(".ripple-container");
    rippleContainer?.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={avatarRef}
      id={`avatar-${alt}`}
      className={`relative w-${size} h-${size} group flex items-center justify-center cursor-pointer ${showAnimation}`}
      title={tooltip}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      onClick={handleClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      {isVisible && (
        <img
          src={isError ? fallbackSrc : src}
          alt={alt}
          onError={handleError}
          className={`${shapeClass} w-${size} h-${size} object-cover transition-transform duration-300 ease-in-out group-hover:${animation}`}
        />
      )}
      <div
        className={`absolute inset-0 ${shapeClass} border-${borderWidth} border-${borderColor} border-${borderStyle} group-hover:border-neon transition-all duration-300 ease-in-out ${themeClasses[theme]}`}
      ></div>
      {showStatus && (
        <span
          className={`absolute ${statusPositionClasses[statusPosition]} block w-3 h-3 bg-${statusColor}-500 border-${borderWidth} border-white ${shapeClass}`}
        ></span>
      )}
      {showBadge && (
        <span
          className={`absolute ${badgePositionClasses[badgePosition]} flex items-center justify-center ${badgeSizeClasses[badgeSize]} bg-${badgeColor}-500 border-${badgeBorderWidth} border-${badgeBorderColor} ${badgeShapeClass}`}
        >
          {badgeContent}
        </span>
      )}
      <div className="ripple-container absolute inset-0 overflow-hidden rounded-full"></div>
      <style>{`
        @media (max-width: 768px) {
          .w-${size} {
            width: ${size / 2}px;
          }
          .h-${size} {
            height: ${size / 2}px;
          }
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 600ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Avatar;
