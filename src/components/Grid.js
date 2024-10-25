// src/components/Grid.js
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext
import { AiOutlineSearch } from "react-icons/ai";

const Grid = ({
  children,
  fetchData,
  isLoading,
  onItemHover,
  onItemClick,
  columns = { base: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  loadingComponent = <div className="text-white text-center">加载中...</div>,
  emptyComponent = (
    <div className="text-gray-400 text-center">没有可用的项</div>
  ),
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  itemsPerPage = 10, // 新增属性
  searchPlaceholder = "搜索...", // 新增属性
}) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    const loadItems = async () => {
      if (fetchData) {
        const data = await fetchData();
        setItems(data);
      }
    };
    loadItems();
  }, [fetchData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 重置到第一页
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <AiOutlineSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={searchPlaceholder}
          className={`p-2 border-${borderWidth} rounded w-full focus:outline-none focus:ring focus:ring-purple-500 ${animation}`}
          aria-label="搜索"
        />
      </div>
      {isLoading ? (
        loadingComponent
      ) : (
        <div
          className={`grid grid-cols-${columns.base} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-${gap}`}
        >
          {paginatedItems.length > 0
            ? paginatedItems.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg ${animation} hover:scale-105 hover:shadow-neon ${
                    themeClasses[theme || currentTheme]
                  } border-${borderWidth}`}
                  onMouseEnter={() => onItemHover && onItemHover(item)}
                  onClick={() => onItemClick && onItemClick(item)}
                  title={tooltip}
                  aria-label="Grid item"
                >
                  <div className="p-4">
                    <h3 className="text-white text-xl font-semibold flex items-center">
                      {icon && <span className="mr-2">{icon}</span>}
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))
            : emptyComponent}
        </div>
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .grid-cols-${columns.base} {
            grid-template-columns: repeat(${columns.base}, minmax(0, 1fr));
          }
        }
        @media (min-width: 640px) {
          .sm\\:grid-cols-${columns.sm} {
            grid-template-columns: repeat(${columns.sm}, minmax(0, 1fr));
          }
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-${columns.md} {
            grid-template-columns: repeat(${columns.md}, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-${columns.lg} {
            grid-template-columns: repeat(${columns.lg}, minmax(0, 1fr));
          }
        }
        .gap-${gap} {
          gap: ${gap * 0.25}rem;
        }
      `}</style>
    </div>
  );
};

export default Grid;
