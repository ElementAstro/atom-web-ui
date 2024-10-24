// src/components/VerticalMenu.js
import React from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";

const VerticalMenu = ({ items, activeIndex, onItemSelect }) => {
  return (
    <ul className="flex flex-col space-y-2 p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-neon">
      {items.map((item, index) => (
        <li
          key={index}
          className={`p-2 rounded transition duration-300 transform hover:scale-105 
          ${
            activeIndex === index
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-neon"
              : "hover:bg-gray-700 hover:text-white"
          }`}
        >
          <a
            href="#"
            className="flex items-center text-blue-700"
            onClick={() => onItemSelect(index)} // Handle item click
          >
            {item.icon && (
              <span className="mr-2">{item.icon}</span> // Include icon if present
            )}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default VerticalMenu;
