// src/components/Grid.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import { useTheme } from "../context/ThemeContext";
import { AiOutlineSearch } from "react-icons/ai";

interface GridProps {
  fetchData?: () => Promise<any[]>;
  isLoading?: boolean;
  onItemHover?: (item: any) => void;
  onItemClick?: (item: any) => void;
  columns?: { base: number; sm: number; md: number; lg: number };
  rows?: number; // 新增的行参数
  gap?: number;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  theme?: "light" | "dark" | "astronomy" | "eyeCare";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  itemsPerPage?: number;
  searchPlaceholder?: string;
  gridBackgroundColor?: string;
  gridTextColor?: string;
  itemBackgroundColor?: string;
  itemTextColor?: string;
  searchInputBackgroundColor?: string;
  searchInputTextColor?: string;
  paginationButtonBackgroundColor?: string;
  paginationButtonTextColor?: string;
}

const Grid: React.FC<GridProps> = ({
  fetchData,
  isLoading,
  onItemHover,
  onItemClick,
  columns = { base: 1, sm: 2, md: 3, lg: 4 },
  rows = 1, // 默认值为1
  gap = 4,
  loadingComponent = <div className="text-white text-center">加载中...</div>,
  emptyComponent = (
    <div className="text-gray-400 text-center">没有可用的项</div>
  ),
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  itemsPerPage = 10,
  searchPlaceholder = "搜索...",
  gridBackgroundColor = "bg-gray-800",
  gridTextColor = "text-white",
  itemBackgroundColor = "bg-gray-700",
  itemTextColor = "text-white",
  searchInputBackgroundColor = "bg-gray-600",
  searchInputTextColor = "text-white",
  paginationButtonBackgroundColor = "bg-gray-700",
  paginationButtonTextColor = "text-gray-300",
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    const loadItems = async () => {
      if (fetchData) {
        const data = await fetchData();
        setItems(data);
      }
    };
    loadItems();
  }, [fetchData]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  type ThemeKeys = "light" | "dark" | "astronomy" | "eyeCare";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className={`p-4 ${gridBackgroundColor} ${gridTextColor}`}>
      <div className="flex items-center mb-4">
        <AiOutlineSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={searchPlaceholder}
          className={`p-2 border-${borderWidth} rounded w-full focus:outline-none focus:ring focus:ring-purple-500 ${animation} ${searchInputBackgroundColor} ${searchInputTextColor}`}
          aria-label="搜索"
        />
      </div>
      {isLoading ? (
        loadingComponent
      ) : (
        <div
          className={`grid grid-cols-${columns.base} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-${gap}`}
          style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }} // 使用rows参数
        >
          {paginatedItems.length > 0
            ? paginatedItems.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden shadow-lg ${animation} hover:scale-105 hover:shadow-neon ${
                    themeClasses[
                      (theme as ThemeKeys) || (currentTheme as ThemeKeys)
                    ]
                  } border-${borderWidth} ${itemBackgroundColor} ${itemTextColor}`}
                  onMouseEnter={() => onItemHover && onItemHover(item)}
                  onClick={() => onItemClick && onItemClick(item)}
                  title={tooltip}
                  aria-label="Grid item"
                >
                  <div className="p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      {icon && <span className="mr-2">{icon}</span>}
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
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
                : `${paginationButtonBackgroundColor} ${paginationButtonTextColor}`
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <style>{`
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
