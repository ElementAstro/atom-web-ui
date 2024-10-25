import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { AiOutlineSearch } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

const FlowLayout = ({
  items,
  onItemClick,
  onItemHover,
  onDragEnd,
  customClass = "",
  draggable = true,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    onDragEnd(newItems);
  };

  const Item = ({ item, index }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "item",
      hover(draggedItem) {
        if (draggedItem.index !== index) {
          moveItem(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "item",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    if (draggable) {
      drag(drop(ref));
    }

    const themeClasses = {
      light: "bg-white text-gray-900 border-gray-300",
      dark: "bg-gray-900 text-white border-gray-700",
      astronomy:
        "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
      eyeCare: "bg-green-100 text-green-900 border-green-300",
    };

    return (
      <div
        ref={ref}
        className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded shadow-lg ${animation} hover:shadow-xl hover:scale-105 hover:shadow-neon ${
          isDragging ? "opacity-50" : "opacity-100"
        } ${themeClasses[theme || currentTheme]} border-${borderWidth}`}
        onClick={() => onItemClick && onItemClick(item)}
        onMouseEnter={() => onItemHover && onItemHover(item)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onItemClick && onItemClick(item);
          }
        }}
        title={tooltip}
        aria-label="Flow item"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {item}
      </div>
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${customClass}`} ref={containerRef}>
      <div className="flex items-center mb-4">
        <AiOutlineSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="搜索..."
          className={`p-2 border-${borderWidth} rounded w-full focus:outline-none focus:ring focus:ring-purple-500 ${animation}`}
          aria-label="搜索"
        />
      </div>
      <div className={`flex flex-wrap gap-4 p-4 bg-gray-900 ${customClass}`}>
        {filteredItems.map((item, index) => (
          <Item key={index} item={item} index={index} />
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .p-4 {
            padding: 1rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .w-full {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

FlowLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  onItemClick: PropTypes.func,
  onItemHover: PropTypes.func,
  onDragEnd: PropTypes.func,
  customClass: PropTypes.string,
  draggable: PropTypes.bool,
  theme: PropTypes.string,
  tooltip: PropTypes.string,
  borderWidth: PropTypes.string,
  animation: PropTypes.string,
  icon: PropTypes.node,
};

export default FlowLayout;
