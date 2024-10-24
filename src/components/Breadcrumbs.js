import React from "react";
import { Link, useLocation } from "react-router-dom"; // 使用 useLocation 代替 useContext

const Breadcrumbs = ({
  items,
  onItemClick,
  variant = "primary",
  separator = "/",
  customClass = "",
}) => {
  const location = useLocation(); // 获取当前路径

  const variantClasses = {
    primary: "text-gray-400 hover:text-white",
    secondary: "text-gray-500 hover:text-gray-300",
    alert: "text-red-500 hover:text-red-300",
    success: "text-green-500 hover:text-green-300",
  };

  return (
    <nav className={`text-gray-400 ${customClass}`} aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && <span className="mx-2">{separator}</span>}
            {item.link ? (
              <Link
                to={item.link}
                className={`transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon ${variantClasses[variant]}`}
                aria-current={location.pathname === item.link ? "page" : undefined}
                onClick={() => onItemClick && onItemClick(item)}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-200">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;