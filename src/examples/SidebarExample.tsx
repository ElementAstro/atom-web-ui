import React from "react";
import Sidebar from "../components/Sidebar";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";

const SidebarExample: React.FC = () => {
  const items = [
    { title: "Home", icon: "home" },
    { title: "User", icon: "user" },
    { title: "Settings", icon: "settings" },
    {
      title: "More",
      icon: "settings",
      subItems: [
        { title: "Sub Item 1" },
        { title: "Sub Item 2" },
        { title: "Sub Item 3" },
      ],
    },
  ];

  const handleItemClick = (item: { title: string }) => {
    console.log("Item clicked:", item.title);
  };

  const handleOpen = () => {
    console.log("Sidebar opened");
  };

  const handleClose = () => {
    console.log("Sidebar closed");
  };

  return (
    <div className="p-4">
      <Sidebar
        items={items}
        onItemClick={handleItemClick}
        onOpen={handleOpen}
        onClose={handleClose}
        theme="dark"
        tooltip="Toggle Sidebar"
        borderWidth="2"
        animation="transition-all duration-300 ease-in-out"
        icon={<AiOutlineHome />}
        fullscreen={false}
        autoClose={false}
        autoCloseDuration={5000}
        iconColor="text-gray-400"
        customClass="my-custom-sidebar"
        customButtonClass="my-custom-button"
        customInputClass="my-custom-input"
        customItemClass="my-custom-item"
        customSubItemClass="my-custom-sub-item"
      />
    </div>
  );
};

export default SidebarExample;