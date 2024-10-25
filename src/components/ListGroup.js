// src/components/ListGroup.js
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const ListGroup = ({
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
  theme, // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  iconPosition = "left", // 新增属性
  multiSelect = false, // 新增属性
  onContextMenu, // 新增属性
  onDragEnd, // 新增属性
  onDoubleClick, // 新增属性
  onKeyDown, // 新增属性
  ariaLabel = "List item", // 新增属性
  rippleEffect = true, // 新增属性
  rippleColor = "rgba(255, 255, 255, 0.6)", // 新增属性
  rippleDuration = 600, // 新增属性
  showTooltip = false, // 新增属性
  tooltipPosition = "top", // 新增属性
  showCheckbox = false, // 新增属性
  onCheckboxChange, // 新增属性
}) => {
  const [selectedIndices, setSelectedIndices] = useState(
    multiSelect ? [] : [selected]
  );
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const listRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (listRef.current.contains(event.target)) {
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

  const handleItemClick = (index) => {
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

  const handleDragEnd = (event) => {
    const { oldIndex, newIndex } = event;
    onDragEnd && onDragEnd(oldIndex, newIndex);
  };

  const createRipple = (event) => {
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
    info: "bg-blue-700 text-white", // 新增变体
    warning: "bg-yellow-700 text-black", // 新增变体
  };

  const sizeClasses = {
    small: "text-sm px-2 py-1",
    medium: "text-md px-4 py-2",
    large: "text-lg px-6 py-3",
    extraLarge: "text-xl px-8 py-4", // 新增尺寸
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300", // 新增主题
    sunset: "bg-orange-100 text-orange-900 border-orange-300", // 新增主题
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
              : "hover:bg-gray-700 hover:scale-105 hover:shadow-neon"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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
            <span className="mr-2">{icon}</span>
          )}
          {item}
          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
          {showTooltip && (
            <div className={`tooltip ${tooltipClasses[tooltipPosition]}`}>
              {tooltip}
            </div>
          )}
        </li>
      ))}
      <style jsx>{`
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
