// src/components/Menu.js
import React, { useState } from "react";

const Menu = ({ items, onOpen, onClose, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && onOpen) onOpen();
      if (!newState && onClose) onClose();
      return newState;
    });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-neon"
      >
        菜单
      </button>
      {isOpen && (
        <ul className="absolute bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg mt-1 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-500 transition duration-150 cursor-pointer"
              onClick={() => onItemClick && onItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
