// src/components/Sidebar.js
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
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Sidebar = ({
  items,
  onItemClick,
  onOpen,
  onClose,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-all duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  autoClose = false, // 新增属性
  autoCloseDuration = 5000, // 新增属性
  iconColor = "text-gray-400", // 新增属性
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [expandedItems, setExpandedItems] = useState({});
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const timerRef = useRef(null);

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
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const handleExpandToggle = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`relative h-full ${animation} ${isOpen ? "w-64" : "w-16"} ${
        themeClasses[theme || currentTheme]
      } shadow-neon border-${borderWidth} ${fullscreen ? "w-full h-full" : ""}`}
    >
      <button
        onClick={handleToggle}
        className="absolute top-4 right-4 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
        aria-label="Toggle Sidebar"
        title={tooltip}
      >
        {icon || (isOpen ? "❮" : "❯")}
      </button>
      <button
        onClick={handleLockToggle}
        className="absolute top-4 right-16 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
        aria-label="Lock/Unlock Sidebar"
        title={tooltip}
      >
        {isLocked ? <AiOutlineLock /> : <AiOutlineUnlock />}
      </button>
      <button
        onClick={handleFullscreenToggle}
        className="absolute top-4 right-28 w-8 h-8 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
        aria-label="Toggle Fullscreen"
        title={tooltip}
      >
        {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
      </button>
      {isOpen && (
        <div className="p-4">
          <h2 className="text-lg font-bold text-white mb-4">侧边栏</h2>
          <div className="relative mb-4">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <ul>
            {filteredItems.map((item, index) => (
              <li key={index} className="my-2">
                <a
                  href="#"
                  onClick={() => onItemClick && onItemClick(item)}
                  className="flex items-center text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-neon"
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
                  <span className={`${!isOpen ? "hidden" : ""}`}>
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
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="my-1">
                        <a
                          href="#"
                          onClick={() => onItemClick && onItemClick(subItem)}
                          className="flex items-center text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-neon"
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
      )}
    </div>
  );
};

export default Sidebar;
