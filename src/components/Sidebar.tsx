// src/components/Sidebar.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineSearch,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface SidebarItem {
  title: string;
  icon?: string;
  subItems?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  onItemClick?: (item: SidebarItem) => void;
  onOpen?: () => void;
  onClose?: () => void;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
  iconColor?: string;
  customClass?: string;
  customButtonClass?: string;
  customInputClass?: string;
  customItemClass?: string;
  customSubItemClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  onItemClick,
  onOpen,
  onClose,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition-all duration-300 ease-in-out",
  icon = null,
  fullscreen = false,
  autoClose = false,
  autoCloseDuration = 5000,
  iconColor = "text-gray-400",
  customClass = "",
  customButtonClass = "",
  customInputClass = "",
  customItemClass = "",
  customSubItemClass = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  useEffect(() => {
    if (isOpen && autoClose) {
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
        if (onClose) onClose();
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  const handleToggle = () => {
    if (!isLocked) {
      setIsOpen(!isOpen);
      if (isOpen && onClose) {
        onClose();
      } else if (!isOpen && onOpen) {
        onOpen();
      }
    }
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };

  const handleFullscreenToggle = () => {
    if (fullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    }
  };

  const handleExpandToggle = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
    <div
      className={`relative h-full ${animation} ${isOpen ? "w-64" : "w-16"} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } shadow-neon border-${borderWidth} ${
        fullscreen ? "w-full h-full" : ""
      } ${customClass}`}
    >
      <button
        onClick={handleToggle}
        className={`absolute top-4 right-4 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
        aria-label="Toggle Sidebar"
        title={tooltip}
      >
        {icon || (isOpen ? "❮" : "❯")}
      </button>
      {isOpen && (
        <>
          <button
            onClick={handleLockToggle}
            className={`absolute top-4 right-16 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Lock/Unlock Sidebar"
            title={tooltip}
          >
            {isLocked ? <AiOutlineLock /> : <AiOutlineUnlock />}
          </button>
          <button
            onClick={handleFullscreenToggle}
            className={`absolute top-4 right-28 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Toggle Fullscreen"
            title={tooltip}
          >
            {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </button>
        </>
      )}
      <div className={`p-4 ${isOpen ? "" : "hidden"}`}>
        <h2 className="text-lg font-bold text-white mb-4">侧边栏</h2>
        <div className="relative mb-4">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 ${customInputClass}`}
          />
        </div>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} className={`my-2 ${customItemClass}`}>
              <a
                href="#"
                onClick={() => onItemClick && onItemClick(item)}
                className={`flex items-center text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition duration-300 transform ${hoverAnimation}`}
              >
                {item.icon === "home" && (
                  <AiOutlineHome className={`mr-2 ${iconColor}`} />
                )}
                {item.icon === "user" && (
                  <AiOutlineUser className={`mr-2 ${iconColor}`} />
                )}
                {item.icon === "settings" && (
                  <AiOutlineSetting className={`mr-2 ${iconColor}`} />
                )}
                <span className={`${isOpen ? "" : "hidden"}`}>
                  {item.title}
                </span>
                {item.subItems && (
                  <button
                    onClick={() => handleExpandToggle(index)}
                    className="ml-auto text-gray-400 hover:text-white transition duration-300 w-6 h-6 flex items-center justify-center"
                  >
                    {expandedItems[index] ? "▲" : "▼"}
                  </button>
                )}
              </a>
              {item.subItems && expandedItems[index] && (
                <ul className={`ml-4 mt-2 space-y-2 ${customSubItemClass}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="my-1">
                      <a
                        href="#"
                        onClick={() => onItemClick && onItemClick(subItem)}
                        className={`flex items-center text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition duration-300 transform ${hoverAnimation}`}
                      >
                        <span>{subItem.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {!isOpen && (
        <div className="p-4">
          <ul>
            {filteredItems.map((item, index) => (
              <li key={index} className={`my-2 ${customItemClass}`}>
                <a
                  href="#"
                  onClick={() => onItemClick && onItemClick(item)}
                  className={`flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition duration-300 transform ${hoverAnimation}`}
                >
                  {item.icon === "home" && (
                    <AiOutlineHome className={`${iconColor}`} />
                  )}
                  {item.icon === "user" && (
                    <AiOutlineUser className={`${iconColor}`} />
                  )}
                  {item.icon === "settings" && (
                    <AiOutlineSetting className={`${iconColor}`} />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={handleToggle}
            className={`absolute bottom-4 right-4 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Toggle Sidebar"
            title={tooltip}
          >
            {icon || (isOpen ? "❮" : "❯")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;