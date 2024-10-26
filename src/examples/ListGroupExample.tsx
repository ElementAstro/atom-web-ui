import React from "react";
import ListGroup from "../components/ListGroup";

const ListGroupExample: React.FC = () => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const handleItemClick = (item: string) => {
    console.log("Item clicked:", item);
  };

  const handleItemHover = (item: string) => {
    console.log("Item hovered:", item);
  };

  return (
    <div className="p-4">
      <ListGroup
        items={items}
        onItemClick={handleItemClick}
        onItemHover={handleItemHover}
        variant="primary"
        customClass="my-custom-list-group"
        icon={<span>🔹</span>}
        disabled={false}
        tooltip="Click an item"
        selected={null}
        size="medium"
        theme="light"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="left"
        multiSelect={false}
        ariaLabel="示例列表项"
        rippleEffect={true}
        rippleColor="rgba(255, 255, 255, 0.6)"
        rippleDuration={600}
        showTooltip={true}
        tooltipPosition="top"
        showCheckbox={false}
        customItemClass="my-custom-item"
        customIconClass="my-custom-icon"
        customTooltipClass="my-custom-tooltip"
      />
    </div>
  );
};

export default ListGroupExample;