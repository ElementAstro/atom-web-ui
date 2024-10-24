import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";

const FlowLayout = ({
  items,
  onItemClick,
  onItemHover,
  onDragEnd,
  customClass = "",
  draggable = true,
}) => {
  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    onDragEnd(newItems);
  };

  const Item = ({ item, index }) => {
    const ref = React.useRef(null);
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

    return (
      <div
        ref={ref}
        className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-gray-800 rounded shadow-lg transition duration-200 hover:shadow-xl hover:scale-105 hover:shadow-neon ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
        onClick={() => onItemClick && onItemClick(item)}
        onMouseEnter={() => onItemHover && onItemHover(item)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onItemClick && onItemClick(item);
          }
        }}
      >
        {item}
      </div>
    );
  };

  return (
    <div className={`flex flex-wrap gap-4 p-4 bg-gray-900 ${customClass}`}>
      {items.map((item, index) => (
        <Item key={index} item={item} index={index} />
      ))}
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
};

export default FlowLayout;