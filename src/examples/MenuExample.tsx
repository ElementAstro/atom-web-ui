import React from "react";
import Menu from "../components/Menu";
import { AiOutlineMenu } from "react-icons/ai";

const MenuExample: React.FC = () => {
  const handleOpen = () => {
    console.log("Menu opened");
  };

  const handleClose = () => {
    console.log("Menu closed");
  };

  const handleItemClick = (item: string) => {
    console.log("Item clicked:", item);
  };

  return (
    <div className="p-4">
      <Menu
        items={[{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }]}
        onOpen={handleOpen}
        onClose={handleClose}
        onItemClick={handleItemClick}
        responsive={true}
        position="bottom"
        icon={<AiOutlineMenu />}
        disabled={false}
        animation="scale-105"
        closeOnClickOutside={true}
        theme="light"
        tooltip="Click to open menu"
        borderWidth="2"
        iconPosition="left"
        fullWidth={false}
        multiSelect={false}
        customClass="my-custom-menu"
        customItemClass="my-custom-item"
        customIconClass="my-custom-icon"
      />
    </div>
  );
};

export default MenuExample;
