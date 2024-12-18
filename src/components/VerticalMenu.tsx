import React, { useState, DragEvent, KeyboardEvent, MouseEvent } from "react";
import { useTheme } from "../context/ThemeContext";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
}

interface VerticalMenuProps {
  items: MenuItem[];
  activeIndex: number;
  onItemSelect: (index: number | string) => void;
  onItemHover?: (index: number) => void;
  onItemFocus?: (index: number) => void;
  onItemBlur?: (index: number) => void;
  customClass?: string;
  customItemClass?: string;
  customActiveItemClass?: string;
  customIconClass?: string;
  multiSelect?: boolean;
  draggable?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  animation?: string;
  fullscreen?: boolean;
  collapsible?: boolean;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
  showLabels?: boolean;
  labelColor?: string;
  labelActiveColor?: string;
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({
  items,
  activeIndex,
  onItemSelect,
  onItemHover,
  onItemFocus,
  onItemBlur,
  customClass = "",
  customItemClass = "",
  customActiveItemClass = "",
  customIconClass = "",
  multiSelect = false,
  draggable = false,
  theme,
  tooltip = "",
  animation = "transition duration-300 transform hover:scale-105",
  fullscreen = false,
  collapsible = false,
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
  showLabels = true,
  labelColor = "text-gray-200",
  labelActiveColor = "text-white",
}) => {
  const [selectedIndices, setSelectedIndices] = useState<(number | string)[]>(
    multiSelect ? [] : [activeIndex]
  );
  const [collapsedIndices, setCollapsedIndices] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });
  const { theme: currentTheme } = useTheme();

  const handleItemClick = (index: number | string) => {
    if (multiSelect) {
      setSelectedIndices((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedIndices([index]);
    }
    onItemSelect(index);
  };

  const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", index.toString());
    }
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>, index: number) => {
    if (draggable) {
      const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      onItemSelect(index);
    }
  };

  const handleCollapseToggle = (index: number) => {
    setCollapsedIndices((prevCollapsed) =>
      prevCollapsed.includes(index)
        ? prevCollapsed.filter((i) => i !== index)
        : [...prevCollapsed, index]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowDown") {
      // Handle down arrow key
    } else if (e.key === "ArrowUp") {
      // Handle up arrow key
    }
  };

  const handleContextMenu = (e: MouseEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
  };

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";

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
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchKeyword}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      <ul
        className={`flex flex-col space-y-2 p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-neon ${customClass} ${
          fullscreen ? "w-full h-full" : ""
        } ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]}`}
        onKeyDown={handleKeyDown}
      >
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded ${animation} 
            ${
              selectedIndices.includes(index)
                ? `bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-neon ${customActiveItemClass}`
                : `hover:bg-gray-700 hover:text-white ${customItemClass}`
            } ${hoverColor} ${activeColor} ${disabledColor} ${hoverAnimation}`}
            draggable={draggable}
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => onItemHover && onItemHover(index)}
            onFocus={() => onItemFocus && onItemFocus(index)}
            onBlur={() => onItemBlur && onItemBlur(index)}
            onContextMenu={(e) => handleContextMenu(e, index)}
            title={tooltip}
          >
            <button
              className="flex items-center text-blue-700 bg-transparent border-none p-0 m-0 cursor-pointer"
              onClick={() => handleItemClick(index)}
            >
              {item.icon && (
                <span className={`mr-2 ${customIconClass}`}>{item.icon}</span>
              )}
              {showLabels && (
                <span
                  className={`${
                    selectedIndices.includes(index)
                      ? labelActiveColor
                      : labelColor
                  }`}
                >
                  {item.label}
                </span>
              )}
              {collapsible && item.subItems && (
                <span
                  className="ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCollapseToggle(index);
                  }}
                >
                  {collapsedIndices.includes(index) ? "▲" : "▼"}
                </span>
              )}
            </button>
            {item.subItems && !collapsedIndices.includes(index) && (
              <ul className="ml-4 mt-2 space-y-2">
                {item.subItems.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`p-2 rounded ${animation} 
                    ${
                      selectedIndices.includes(`${index}-${subIndex}`)
                        ? `bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-neon ${customActiveItemClass}`
                        : `hover:bg-gray-700 hover:text-white ${customItemClass}`
                    } ${hoverColor} ${activeColor} ${disabledColor} ${hoverAnimation}`}
                    onClick={() => handleItemClick(`${index}-${subIndex}`)}
                  >
                    <button className="flex items-center text-blue-700 bg-transparent border-none p-0 m-0 cursor-pointer">
                      {subItem.icon && (
                        <span className={`mr-2 ${customIconClass}`}>
                          {subItem.icon}
                        </span>
                      )}
                      {showLabels && (
                        <span
                          className={`${
                            selectedIndices.includes(`${index}-${subIndex}`)
                              ? labelActiveColor
                              : labelColor
                          }`}
                        >
                          {subItem.label}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {contextMenu.visible && (
        <div
          className="absolute bg-white shadow-lg rounded p-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button className="block w-full text-left p-2">Option 1</button>
          <button className="block w-full text-left p-2">Option 2</button>
          <button className="block w-full text-left p-2">Option 3</button>
        </div>
      )}
    </div>
  );
};

export default VerticalMenu;
