// src/components/Pagination.js
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageHover,
  customClass = "",
  customButtonClass = "",
  customInputClass = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  iconPosition = "left", // 新增属性
  showPageNumbers = true, // 新增属性
}) => {
  const [inputPage, setInputPage] = useState(currentPage);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
      setInputPage(page);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    const page = Number(inputPage);
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(currentPage);
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <nav
      className={`flex justify-center my-4 ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      <ul className="flex flex-wrap justify-center space-x-2">
        <li>
          <button
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title={tooltip}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            &laquo; First
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </button>
        </li>
        <li>
          <button
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title={tooltip}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            &laquo; Prev
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </button>
        </li>

        {showPageNumbers &&
          Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 rounded transition transform duration-300 ${
                  index + 1 === currentPage
                    ? "bg-blue-500 text-white scale-105"
                    : "bg-gray-200 hover:bg-blue-300"
                } ${customButtonClass} border-${borderWidth} ${animation}`}
                onClick={() => handlePageChange(index + 1)}
                onMouseEnter={() => onPageHover && onPageHover(index + 1)}
                title={tooltip}
              >
                {icon && iconPosition === "left" && (
                  <span className="mr-2">{icon}</span>
                )}
                {index + 1}
                {icon && iconPosition === "right" && (
                  <span className="ml-2">{icon}</span>
                )}
              </button>
            </li>
          ))}

        <li>
          <button
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title={tooltip}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            Next &raquo;
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </button>
        </li>
        <li>
          <button
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title={tooltip}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            Last &raquo;
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </button>
        </li>
        <li>
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${customInputClass}`}
            placeholder="Page"
            title={tooltip}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
