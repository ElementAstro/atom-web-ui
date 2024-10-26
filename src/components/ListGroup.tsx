// src/components/ListGroup.tsx
import React, {
  useState,
  useEffect,
  useRef,
  FC,
  MouseEvent,
  KeyboardEvent,
  DragEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface ListGroupProps {
  items: string[];
  onItemClick?: (item: string) => void;
  onItemHover?: (item: string) => void;
  variant?: "primary" | "secondary" | "alert" | "success" | "info" | "warning";
  customClass?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  tooltip?: string;
  selected?: number | null;
  size?: "small" | "medium" | "large" | "extraLarge";
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "ocean" | "sunset";
  borderWidth?: string;
  animation?: string;
  iconPosition?: "left" | "right";
  multiSelect?: boolean;
  onContextMenu?: (e: MouseEvent<HTMLLIElement>, item: string) => void;
  onDragEnd?: (oldIndex: number, newIndex: number) => void;
  onDoubleClick?: (e: MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLLIElement>) => void;
  ariaLabel?: string;
  rippleEffect?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  showCheckbox?: boolean;
  onCheckboxChange?: (index: number) => void;
  customItemClass?: string;
  customIconClass?: string;
  customTooltipClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const ListGroup: FC<ListGroupProps> = ({
  items,
  onItemClick,
  onItemHover,
  variant = "primary",
  customClass = "",
  icon = null,
  disabled = false,
  tooltip = "",
  selected = null,
  size = "medium",
  theme,
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "left",
  multiSelect = false,
  onContextMenu,
  onDragEnd,
  onDoubleClick,
  onKeyDown,
  ariaLabel = "List item",
  rippleEffect = true,
  rippleColor = "rgba(255, 255, 255, 0.6)",
  rippleDuration = 600,
  showTooltip = false,
  tooltipPosition = "top",
  showCheckbox = false,
  onCheckboxChange,
  customItemClass = "",
  customIconClass = "",
  customTooltipClass = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    multiSelect ? [] : selected !== null ? [selected] : []
  );
  const { theme: currentTheme } = useTheme();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (listRef.current?.contains(event.target as Node)) {
        const currentIndex = selectedIndices[0];
        if (event.key === "ArrowDown") {
          const nextIndex = (currentIndex + 1) % items.length;
          setSelectedIndices([nextIndex]);
          onItemClick && onItemClick(items[nextIndex]);
        } else if (event.key === "ArrowUp") {
          const prevIndex = (currentIndex - 1 + items.length) % items.length;
          setSelectedIndices([prevIndex]);
          onItemClick && onItemClick(items[prevIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndices, items, onItemClick]);

  const handleItemClick = (index: number) => {
    if (multiSelect) {
      setSelectedIndices((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedIndices([index]);
    }
    onItemClick && onItemClick(items[index]);
  };

  const handleDragEnd = (event: DragEvent<HTMLLIElement>) => {
    const oldIndex = Number(event.dataTransfer?.getData("oldIndex"));
    const newIndex = Number(event.dataTransfer?.getData("newIndex"));
    onDragEnd && onDragEnd(oldIndex, newIndex);
  };

  const createRipple = (event: MouseEvent<HTMLLIElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.style.background = rippleColor;
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, rippleDuration);
  };

  const variantClasses = {
    primary: "bg-gray-800 text-white",
    secondary: "bg-gray-700 text-gray-300",
    alert: "bg-red-700 text-white",
    success: "bg-green-700 text-white",
    info: "bg-blue-700 text-white",
    warning: "bg-yellow-700 text-black",
  };

  const sizeClasses = {
    small: "text-sm px-2 py-1",
    medium: "text-md px-4 py-2",
    large: "text-lg px-6 py-3",
    extraLarge: "text-xl px-8 py-4",
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
  };

  const tooltipClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  return (
    <ul
      ref={listRef}
      className={`rounded-md shadow-md ${
        variantClasses[variant]
      } ${customClass} ${themeClasses[theme || currentTheme]}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex items-center ${
            sizeClasses[size]
          } border-${borderWidth} border-gray-600 last:border-b-0 transition-colors duration-200 transform ${animation} ${
            selectedIndices.includes(index)
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-700"
          } ${hoverColor} ${activeColor} ${
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          } ${customItemClass} ${hoverAnimation}`}
          onClick={(e) => {
            if (!disabled) {
              handleItemClick(index);
              if (rippleEffect) createRipple(e);
            }
          }}
          onMouseEnter={() => !disabled && onItemHover && onItemHover(item)}
          onContextMenu={(e) =>
            !disabled && onContextMenu && onContextMenu(e, item)
          }
          draggable={!disabled}
          onDragEnd={handleDragEnd}
          onDoubleClick={onDoubleClick}
          onKeyDown={onKeyDown}
          role="button"
          aria-label={`${ariaLabel} ${index + 1}`}
          title={tooltip}
        >
          {showCheckbox && (
            <input
              type="checkbox"
              checked={selectedIndices.includes(index)}
              onChange={() => {
                handleItemClick(index);
                onCheckboxChange && onCheckboxChange(index);
              }}
              className="mr-2"
            />
          )}
          {icon && iconPosition === "left" && (
            <span className={`mr-2 ${customIconClass}`}>{icon}</span>
          )}
          {item}
          {icon && iconPosition === "right" && (
            <span className={`ml-2 ${customIconClass}`}>{icon}</span>
          )}
          {showTooltip && (
            <div
              className={`tooltip ${tooltipClasses[tooltipPosition]} ${customTooltipClass}`}
            >
              {tooltip}
            </div>
          )}
        </li>
      ))}
      <style>{`
        @media (max-width: 640px) {
          li {
            padding: 0.5rem 1rem;
          }
        }
        @media (min-width: 640px) {
          li {
            padding: 0.75rem 1.5rem;
          }
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple ${rippleDuration}ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
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
    </ul>
  );
};

export default ListGroup;
