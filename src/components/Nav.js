import React from "react";

const Navs = ({
  items,
  onNavClick,
  onHover,
  onFocus,
  onBlur,
  customClass = "",
}) => {
  return (
    <div className={`bg-gray-800 rounded-md shadow-md p-4 ${customClass}`}>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onNavClick(item.value)}
              onMouseEnter={() => onHover && onHover(item.value)}
              onFocus={() => onFocus && onFocus(item.value)}
              onBlur={() => onBlur && onBlur(item.value)}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition duration-200 transform hover:scale-105 hover:shadow-neon focus:outline-none"
              disabled={item.disabled}
              aria-disabled={item.disabled}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;