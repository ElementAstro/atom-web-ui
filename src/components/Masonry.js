import React from "react";
import PropTypes from "prop-types";

const Masonry = ({ items, columns, gap, bgColor, textColor, renderItem }) => {
  return (
    <div
      className={`masonry grid grid-cols-${columns} gap-${gap} bg-${bgColor} text-${textColor}`}
    >
      {items.map((item, index) => (
        <div className="masonry-item p-4" key={index}>
          {renderItem ? renderItem(item) : item}
        </div>
      ))}
    </div>
  );
};

Masonry.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object])).isRequired,
  columns: PropTypes.number,
  gap: PropTypes.number,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  renderItem: PropTypes.func,
};

Masonry.defaultProps = {
  columns: 3,
  gap: 4,
  bgColor: "white",
  textColor: "black",
  renderItem: null,
};

export default Masonry;