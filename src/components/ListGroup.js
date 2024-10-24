import React from "react";

const ListGroup = ({
  items,
  onItemClick,
  onItemHover,
  variant = "primary",
  customClass = "",
}) => {
  const variantClasses = {
    primary: "bg-gray-800 text-white",
    secondary: "bg-gray-700 text-gray-300",
    alert: "bg-red-700 text-white",
    success: "bg-green-700 text-white",
  };

  return (
    <ul
      className={`rounded-md shadow-md ${variantClasses[variant]} ${customClass}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className="px-4 py-2 border-b border-gray-600 last:border-b-0 hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105 hover:shadow-neon"
          onClick={() => onItemClick && onItemClick(item)}
          onMouseEnter={() => onItemHover && onItemHover(item)}
          role="button"
          aria-label={`List item ${index + 1}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
