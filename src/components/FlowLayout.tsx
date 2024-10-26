// src/components/FlowLayout.tsx
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useDrag, useDrop } from "react-dnd";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface FlowLayoutProps {
  items: React.ReactNode[];
  onItemClick?: (item: React.ReactNode) => void;
  onItemHover?: (item: React.ReactNode) => void;
  onDragEnd?: (newItems: React.ReactNode[]) => void;
  customClass?: string;
  draggable?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  clearIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  showClearIcon?: boolean;
  showSearchIcon?: boolean;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

interface ItemProps {
  item: React.ReactNode;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onItemClick?: (item: React.ReactNode) => void;
  onItemHover?: (item: React.ReactNode) => void;
  draggable: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const FlowLayout: React.FC<FlowLayoutProps> = ({
  items,
  onItemClick,
  onItemHover,
  onDragEnd,
  customClass = "",
  draggable = true,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  showSearch = true,
  searchPlaceholder = "搜索...",
  clearable = true,
  clearIcon = <AiOutlineClose />,
  searchIcon = <AiOutlineSearch />,
  showClearIcon = true,
  showSearchIcon = true,
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const { theme: currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    if (onDragEnd) onDragEnd(newItems);
  };

  const Item: React.FC<ItemProps> = ({
    item,
    index,
    moveItem,
    onItemClick,
    onItemHover,
    draggable,
    theme,
    tooltip,
    borderWidth,
    animation,
    icon,
    shadow,
    hoverEffect,
    borderStyle,
    borderColor,
    textTransform,
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
      accept: "item",
      hover(draggedItem: { index: number }) {
        if (draggedItem.index !== index) {
          moveItem(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "item",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    if (draggable) {
      drag(drop(ref));
    }

    type ThemeKeys =
      | "light"
      | "dark"
      | "astronomy"
      | "eyeCare"
      | "ocean"
      | "sunset"
      | "astronomyDarkRed";

    const themeClasses: Record<ThemeKeys, string> = {
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
      <div
        ref={ref}
        className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded ${animation} ${
          hoverEffect ? "hover:shadow-xl hover:scale-105 hover:shadow-neon" : ""
        } ${isDragging ? "opacity-50" : "opacity-100"} ${
          themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
        } border-${borderWidth} ${shadow ? "shadow-lg" : ""} ${
          borderStyle ? `border-${borderStyle}` : ""
        } ${borderColor ? `border-${borderColor}` : ""}`}
        onClick={() => onItemClick && onItemClick(item)}
        onMouseEnter={() => onItemHover && onItemHover(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            onItemClick && onItemClick(item);
          }
        }}
        title={tooltip}
        aria-label="Flow item"
        style={{ textTransform }}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {item}
      </div>
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredItems = items.filter((item) =>
    item?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${customClass}`} ref={containerRef}>
      {showSearch && (
        <div className="flex items-center mb-4">
          {showSearchIcon && <AiOutlineSearch className="mr-2 text-gray-400" />}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className={`p-2 border-${borderWidth} rounded w-full focus:outline-none focus:ring focus:ring-purple-500 ${animation}`}
            aria-label="搜索"
          />
          {clearable && showClearIcon && searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="ml-2 text-gray-400 hover:text-red-500 transition duration-300"
            >
              {clearIcon}
            </button>
          )}
        </div>
      )}
      <div className={`flex flex-wrap gap-4 p-4 bg-gray-900 ${customClass}`}>
        {filteredItems.map((item, index) => (
          <Item
            key={index}
            item={item}
            index={index}
            moveItem={moveItem}
            onItemClick={onItemClick}
            onItemHover={onItemHover}
            draggable={draggable}
            theme={theme}
            tooltip={tooltip}
            borderWidth={borderWidth}
            animation={animation}
            icon={icon}
            shadow={shadow}
            hoverEffect={hoverEffect}
            borderStyle={borderStyle}
            borderColor={borderColor}
            textTransform={textTransform}
          />
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .p-4 {
            padding: 1rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .w-full {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FlowLayout;
