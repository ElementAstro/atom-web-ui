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
  animation = "transform transition-transform duration-300-in-out", // 新增属性
  icon = null, // 新增属性
  iconPosition = "left", // 新增属性
  showPageNumbers = true, // 新增属性
  compact = false, // 新增属性
  onDoubleClick, // 新增属性
  onKeyDown, // 新增属性
  ariaLabel = "Pagination", // 新增属性
  maxPageNumbersToShow = 5, // 新增属性，控制显示的最大页码数量
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
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500", // 新增主题
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500", // 新增主题
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfMaxPageNumbersToShow) {
        for (let i = 1; i <= maxPageNumbersToShow; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - halfMaxPageNumbersToShow) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (
          let i = totalPages - maxPageNumbersToShow + 1;
          i <= totalPages;
          i++
        ) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (
          let i = currentPage - halfMaxPageNumbersToShow;
          i <= currentPage + halfMaxPageNumbersToShow;
          i++
        ) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <nav
      className={`flex justify-center my-2 ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
      aria-label={ariaLabel}
    >
      <ul
        className={`flex flex-wrap justify-center space-x-0.5 ${
          compact ? "space-x-0.5" : "space-x-1"
        }`}
      >
        <li>
          <button
            className={`px-1 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title={tooltip}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-1">{icon}</span>
            )}
            &laquo; 首
            {icon && iconPosition === "right" && (
              <span className="ml-1">{icon}</span>
            )}
          </button>
        </li>
        <li>
          <button
            className={`px-1 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title={tooltip}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-1">{icon}</span>
            )}
            &laquo; 上
            {icon && iconPosition === "right" && (
              <span className="ml-1">{icon}</span>
            )}
          </button>
        </li>

        {showPageNumbers &&
          renderPageNumbers().map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="px-2 py-1">...</span>
              ) : (
                <button
                  className={`w-8 h-8 flex items-center justify-center rounded transition transform duration-300 ${
                    page === currentPage
                      ? "bg-blue-500 text-white scale-105"
                      : "bg-gray-200 hover:bg-blue-300"
                  } ${customButtonClass} border-${borderWidth} ${animation}`}
                  onClick={() => handlePageChange(page)}
                  onMouseEnter={() => onPageHover && onPageHover(page)}
                  title={tooltip}
                  onDoubleClick={onDoubleClick}
                  onKeyDown={onKeyDown}
                >
                  {icon && iconPosition === "left" && (
                    <span className="mr-1">{icon}</span>
                  )}
                  {page}
                  {icon && iconPosition === "right" && (
                    <span className="ml-1">{icon}</span>
                  )}
                </button>
              )}
            </li>
          ))}

        <li>
          <button
            className={`px-1 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title={tooltip}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-1">{icon}</span>
            )}
            下 &raquo;
            {icon && iconPosition === "right" && (
              <span className="ml-1">{icon}</span>
            )}
          </button>
        </li>
        <li>
          <button
            className={`px-1 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            } ${customButtonClass} border-${borderWidth} ${animation}`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title={tooltip}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-1">{icon}</span>
            )}
            尾 &raquo;
            {icon && iconPosition === "right" && (
              <span className="ml-1">{icon}</span>
            )}
          </button>
        </li>
        <li>
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`px-1 py-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${customInputClass}`}
            placeholder="页"
            title={tooltip}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
