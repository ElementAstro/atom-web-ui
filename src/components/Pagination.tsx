// src/components/Pagination.tsx
import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageHover?: (page: number) => void;
  customClass?: string;
  customButtonClass?: string;
  customInputClass?: string;
  theme?: string;
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showPageNumbers?: boolean;
  compact?: boolean;
  onDoubleClickButton?: (event: MouseEvent<HTMLButtonElement>) => void; // 修改属性名
  onDoubleClickInput?: (event: MouseEvent<HTMLInputElement>) => void; // 新增属性
  onKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement | HTMLInputElement>
  ) => void;
  ariaLabel?: string;
  maxPageNumbersToShow?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageHover,
  customClass = "",
  customButtonClass = "",
  customInputClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300-in-out",
  icon = null,
  iconPosition = "left",
  showPageNumbers = true,
  compact = false,
  onDoubleClickButton, // 修改属性名
  onDoubleClickInput, // 新增属性
  onKeyDown,
  ariaLabel = "Pagination",
  maxPageNumbersToShow = 5,
}) => {
  const [inputPage, setInputPage] = useState<number | string>(currentPage);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
      setInputPage(page);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const themeClasses: { [key: string]: string } = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
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
            onDoubleClick={onDoubleClickButton} // 修改属性名
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
            onDoubleClick={onDoubleClickButton} // 修改属性名
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
                  onClick={() => handlePageChange(page as number)}
                  onMouseEnter={() =>
                    onPageHover && onPageHover(page as number)
                  }
                  title={tooltip}
                  onDoubleClick={onDoubleClickButton} // 修改属性名
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
            onDoubleClick={onDoubleClickButton} // 修改属性名
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
            onDoubleClick={onDoubleClickButton} // 修改属性名
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
            onDoubleClick={onDoubleClickInput} // 新增属性
            onKeyDown={onKeyDown}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
