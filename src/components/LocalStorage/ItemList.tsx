import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Item from "./Item";

interface ItemProps {
  text: string;
  priority: string;
}

interface ItemListProps {
  items: ItemProps[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onRemove }) => {
  return (
    <Droppable droppableId="droppable">
      {(provided: DroppableProvided) => (
        <ul
          className="list-disc pl-5"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items.map((item, index) => (
            <Item
              key={index}
              item={item}
              index={index}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default ItemList;