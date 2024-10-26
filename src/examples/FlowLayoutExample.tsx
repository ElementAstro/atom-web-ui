import React from "react";
import FlowLayout from "../components/FlowLayout";

const FlowLayoutExample: React.FC = () => {
  const items = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
    <div key="4">Item 4</div>,
  ];

  const handleItemClick = (item: React.ReactNode) => {
    console.log("Item clicked:", item);
  };

  const handleItemHover = (item: React.ReactNode) => {
    console.log("Item hovered:", item);
  };

  const handleDragEnd = (newItems: React.ReactNode[]) => {
    console.log("Items reordered:", newItems);
  };

  return (
    <div className="p-4">
      <FlowLayout
        items={items}
        onItemClick={handleItemClick}
        onItemHover={handleItemHover}
        onDragEnd={handleDragEnd}
        customClass="my-custom-flow-layout"
        draggable={true}
        theme="light"
        tooltip="Click to interact"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>🔗</span>}
      />
    </div>
  );
};

export default FlowLayoutExample;