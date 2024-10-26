import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  ReactNode,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface MenuProps {
  items: {
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
    tooltip?: string;
  }[];
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
  customClass?: string;
  customItemClass?: string;
  customIconClass?: string;
  customItemIconClass?: string;
  customItemHoverClass?: string;
  customItemSelectedClass?: string;
  maxHeight?: string;
  scrollBarClass?: string;
  openAnimation?: string;
  closeAnimation?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
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
  theme,
  tooltip = "",
  borderWidth = "2",
  iconPosition = "left",
  fullWidth = false,
  multiSelect = false,
  customClass = "",
  customItemClass = "",
  customIconClass = "",
  customItemIconClass = "",
  customItemHoverClass = "",
  customItemSelectedClass = "",
  maxHeight = "300px",
  scrollBarClass = "",
  openAnimation = "fade-in",
  closeAnimation = "fade-out",
  hoverColor = "",
  activeColor = "",
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme();

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
          } bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${openAnimation} ${
            responsive ? "w-full sm:w-auto" : ""
          } max-h-${maxHeight} overflow-y-auto ${scrollBarClass}`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`p-2 flex items-center space-x-2 ${
                item.disabled ? disabledColor : "cursor-pointer"
              } ${
                selectedItems.includes(item.label)
                  ? customItemSelectedClass
                  : ""
              } ${customItemClass} ${customItemHoverClass} ${hoverColor} ${activeColor} ${hoverAnimation}`}
              onClick={() => !item.disabled && handleItemClick(item.label)}
              title={item.tooltip}
            >
              {item.icon && (
                <span className={`mr-2 ${customItemIconClass}`}>
                  {item.icon}
                </span>
              )}
              {item.label}
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
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }
        .fade-out {
          opacity: 1;
          animation: fadeOut 0.3s forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
