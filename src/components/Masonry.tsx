// src/components/Masonry.tsx
import React, { ReactNode } from "react";

interface MasonryProps {
  items: ReactNode[];
  columns?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
  renderItem?: (item: ReactNode) => ReactNode;
  customClass?: string; // 新增属性
  customItemClass?: string; // 新增属性
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  columns = 3,
  gap = 4,
  bgColor = "white",
  textColor = "black",
  renderItem = null,
  customClass = "", // 解构新增属性
  customItemClass = "", // 解构新增属性
}) => {
  return (
    <div
      className={`masonry grid grid-cols-${columns} gap-${gap} bg-${bgColor} text-${textColor} ${customClass}`}
    >
      {items.map((item, index) => (
        <div className={`masonry-item p-4 ${customItemClass}`} key={index}>
          {renderItem ? renderItem(item) : item}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
