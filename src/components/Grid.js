// src/components/Grid.js
import React, { useEffect, useState } from "react";

const Grid = ({ children, fetchData, isLoading, onItemHover, onItemClick }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      if (fetchData) {
        const data = await fetchData();
        setItems(data);
      }
    };
    loadItems();
  }, [fetchData]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="text-white text-center">加载中...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-neon"
                onMouseEnter={() => onItemHover && onItemHover(item)}
                onClick={() => onItemClick && onItemClick(item)}
              >
                <div className="p-4">
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center">没有可用的项</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Grid;
