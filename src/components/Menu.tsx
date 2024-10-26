// src/components/Menu.tsx
import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  ReactNode,
} from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface MenuProps {
  items: string[];
  onOpen?: () => void;
  onClose?: () => void;
  onItemClick?: (item: string) => void;
  responsive?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  icon?: ReactNode;
  disabled?: boolean;
  animation?: string;
  closeOnClickOutside?: boolean;
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
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  multiSelect?: boolean;
  customClass?: string; // 新增属性
  customItemClass?: string; // 新增属性
  customIconClass?: string; // 新增属性
}

const Menu: React.FC<MenuProps> = ({
  items,
  onOpen,
  onClose,
  onItemClick,
  responsive = true,
  position = "bottom",
  icon = null,
  disabled = false,
  animation = "scale-105",
  closeOnClickOutside = true,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  iconPosition = "left", // 新增属性
  fullWidth = false, // 新增属性
  multiSelect = false, // 新增属性
  customClass = "", // 解构新增属性
  customItemClass = "", // 解构新增属性
  customIconClass = "", // 解构新增属性
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const toggleMenu = () => {
    if (disabled) return;
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && onOpen) onOpen();
      if (!newState && onClose) onClose();
      return newState;
    });
  };

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    if (closeOnClickOutside) {
      document.addEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
      return () => {
        document.removeEventListener(
          "mousedown",
          handleClickOutside as EventListener
        );
      };
    }
  }, [closeOnClickOutside]);

  const handleItemClick = (item: string) => {
    if (multiSelect) {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    } else {
      setSelectedItems([item]);
      setIsOpen(false);
    }
    onItemClick && onItemClick(item);
  };

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
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
    <div className={`relative inline-block ${customClass}`} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-2 rounded-lg shadow-lg transition duration-300 transform hover:${animation} hover:shadow-neon ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${fullWidth ? "w-full" : ""} ${
          themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
        } border-${borderWidth}`}
        disabled={disabled}
        title={tooltip}
      >
        {icon && iconPosition === "left" && (
          <span className={`mr-2 ${customIconClass}`}>{icon}</span>
        )}
        菜单
        {icon && iconPosition === "right" && (
          <span className={`ml-2 ${customIconClass}`}>{icon}</span>
        )}
      </button>
      {isOpen && (
        <ul
          className={`absolute ${
            positionClasses[position]
          } bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:${animation} hover:shadow-neon ${
            responsive ? "w-full sm:w-auto" : ""
          }`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`p-2 hover:bg-blue-500 transition duration-150 cursor-pointer ${
                selectedItems.includes(item) ? "bg-blue-500" : ""
              } ${customItemClass}`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <style>{`
        @media (max-width: 640px) {
          .w-full {
            width: 100%;
          }
        }
        @media (min-width: 640px) {
          .sm\\:w-auto {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
