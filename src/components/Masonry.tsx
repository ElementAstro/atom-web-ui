// src/components/Masonry.tsx
import React, { ReactNode } from "react";

interface MasonryProps {
  items: ReactNode[];
  columns?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
  renderItem?: (item: ReactNode) => ReactNode;
  customClass?: string;
  customItemClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  columns = 3,
  gap = 4,
  bgColor = "white",
  textColor = "black",
  renderItem = null,
  customClass = "",
  customItemClass = "",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-lg",
}) => {
  return (
    <div
      className={`masonry grid grid-cols-${columns} gap-${gap} bg-${bgColor} text-${textColor} ${customClass}`}
    >
      {items.map((item, index) => (
        <div
          className={`masonry-item p-4 ${customItemClass} ${hoverColor} ${activeColor} ${
            disabled ? disabledColor : ""
          } ${hoverAnimation}`}
          key={index}
        >
          {renderItem ? renderItem(item) : item}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
