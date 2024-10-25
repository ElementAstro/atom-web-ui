import React from "react";
import { Link, useLocation } from "react-router-dom"; // 使用 useLocation 代替 useContext
import { useTheme } from "../context/ThemeContext";

const Breadcrumbs = ({
  items,
  onItemClick,
  variant = "primary",
  separator = "/",
  customClass = "",
  icon = null,
  tooltip = "",
  maxItems = 5,
  responsive = true,
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
}) => {
  const location = useLocation(); // 获取当前路径
  const { theme } = useTheme(); // 获取当前主题

  const variantClasses = {
    primary: "text-gray-400 hover:text-white",
    secondary: "text-gray-500 hover:text-gray-300",
    alert: "text-red-500 hover:text-red-300",
    success: "text-green-500 hover:text-green-300",
  };

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
    ocean: "bg-blue-100 text-blue-900",
    sunset: "bg-orange-100 text-orange-900",
  };

  const displayedItems =
    maxItems && items.length > maxItems
      ? [
          ...items.slice(0, Math.floor(maxItems / 2)),
          { label: "...", link: null },
          ...items.slice(items.length - Math.floor(maxItems / 2)),
        ]
      : items;

  return (
    <nav
      className={`text-gray-400 ${customClass} ${themeClasses[theme]}`}
      aria-label="Breadcrumb"
    >
      <ol className={`flex space-x-2 ${responsive ? "flex-wrap" : ""}`}>
        {displayedItems.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onAnimationEnd={onAnimationEnd}
          >
            {index > 0 && <span className="mx-2">{separator}</span>}
            {item.link ? (
              <Link
                to={item.link}
                className={`transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon ${variantClasses[variant]}`}
                aria-current={
                  location.pathname === item.link ? "page" : undefined
                }
                onClick={() => onItemClick && onItemClick(item)}
                title={tooltip}
              >
                {icon && <span className="mr-2">{icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-200" title={tooltip}>
                {icon && <span className="mr-2">{icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <style jsx>{`
        nav {
          background: linear-gradient(to right, #4a5568, #2d3748);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        li {
          transition: all 0.3s ease;
        }
        li:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;
