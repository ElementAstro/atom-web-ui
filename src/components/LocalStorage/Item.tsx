import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import Button from "../Button"; // 使用项目中的 Button 组件

interface ItemProps {
  item: {
    text: string;
    priority: string;
  };
  index: number;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

const Item: React.FC<ItemProps> = ({ item, index, onEdit, onRemove }) => {
  return (
    <Draggable key={index} draggableId={item.text} index={index}>
      {(provided: DraggableProvided) => (
        <li
          className={`flex justify-between items-center mb-2 border p-2 rounded ${
            item.priority === "高"
              ? "bg-red-200"
              : item.priority === "低"
              ? "bg-green-200"
              : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>
            {item.text} (优先级: {item.priority})
          </span>
          <div>
            <Button
              onClick={() => onEdit(index)}
              customClass="bg-yellow-500 text-white px-2 rounded mr-2"
            >
              编辑
            </Button>
            <Button
              onClick={() => onRemove(index)}
              customClass="bg-red-500 text-white px-2 rounded"
            >
              删除
            </Button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Item;