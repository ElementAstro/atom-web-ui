// src/components/Sidebar.js
import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";

const Sidebar = ({ items, onItemClick, onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen && onClose) {
      onClose();
    } else if (!isOpen && onOpen) {
      onOpen();
    }
  };

  return (
    <div
      className={`relative h-full transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-neon`}
    >
      <button
        onClick={handleToggle}
        className="absolute top-4 right-4 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? "❮" : "❯"}
      </button>
      <div className={`p-4 ${isOpen ? "block" : "hidden"}`}>
        <h2 className="text-lg font-bold text-white mb-4">侧边栏</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="my-2">
              <a
                href="#"
                onClick={() => onItemClick && onItemClick(item)}
                className="flex items-center text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-neon"
              >
                {item.icon === "home" && <AiOutlineHome className="mr-2" />}
                {item.icon === "user" && <AiOutlineUser className="mr-2" />}
                {item.icon === "settings" && (
                  <AiOutlineSetting className="mr-2" />
                )}
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
