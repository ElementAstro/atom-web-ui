// src/components/Nav.tsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface NavItem {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

interface NavProps {
  items: NavItem[];
  onNavClick: (value: string) => void;
  onHover?: (value: string) => void;
  onFocus?: (value: string) => void;
  onBlur?: (value: string) => void;
  customClass?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  multiSelect?: boolean;
  customItemClass?: string;
  customIconClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Navs: React.FC<NavProps> = ({
  items,
  onNavClick,
  onHover,
  onFocus,
  onBlur,
  customClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  iconPosition = "left",
  multiSelect = false,
  customItemClass = "",
  customIconClass = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    multiSelect ? [] : [items.findIndex((item) => item.selected)]
  );
  const { theme: currentTheme } = useTheme();

  const handleNavClick = (index: number) => {
    if (multiSelect) {
      setSelectedIndices((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedIndices([index]);
    }
    onNavClick(items[index].value);
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    forest: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed: "bg-red-100 text-red-900 border-red-300",
  };

  return (
    <div
      className={`bg-gray-800 rounded-md shadow-md p-4 ${customClass} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
    >
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleNavClick(index)}
              onMouseEnter={() => onHover && onHover(item.value)}
              onFocus={() => onFocus && onFocus(item.value)}
              onBlur={() => onBlur && onBlur(item.value)}
              className={`w-full text-left px-4 py-2 rounded transition duration-200 transform focus:outline-none border-${borderWidth} ${animation} ${
                selectedIndices.includes(index) ? "bg-blue-500 text-white" : ""
              } ${customItemClass} ${hoverColor} ${activeColor} ${
                item.disabled ? disabledColor : ""
              } ${hoverAnimation}`}
              disabled={item.disabled}
              aria-disabled={item.disabled}
              title={tooltip}
            >
              {icon && iconPosition === "left" && (
                <span className={`mr-2 ${customIconClass}`}>{icon}</span>
              )}
              {item.label}
              {icon && iconPosition === "right" && (
                <span className={`ml-2 ${customIconClass}`}>{icon}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
