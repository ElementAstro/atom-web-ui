import React, { useState } from "react";
import VerticalMenu from "../components/VerticalMenu";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineInfoCircle,
} from "react-icons/ai";

const VerticalMenuExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const menuItems = [
    { label: "Home", icon: <AiOutlineHome /> },
    { label: "Settings", icon: <AiOutlineSetting /> },
    {
      label: "More",
      icon: <AiOutlineInfoCircle />,
      subItems: [
        { label: "Sub Item 1", index: "2.1" },
        { label: "Sub Item 2", index: "2.2" },
        { label: "Sub Item 3", index: "2.3" },
      ],
    },
  ];

  const handleItemSelect = (index: string | number) => {
    if (typeof index === "number") {
      setActiveIndex(index);
      console.log("Selected item index:", index);
    } else {
      console.log("Selected sub-item index:", index);
    }
  };

  return (
    <div className="p-4">
      <VerticalMenu
        items={menuItems}
        activeIndex={activeIndex}
        onItemSelect={handleItemSelect}
        customClass="my-custom-vertical-menu"
        customItemClass="my-custom-item"
        customActiveItemClass="my-custom-active-item"
        customIconClass="my-custom-icon"
        multiSelect={false}
        draggable={true}
        theme="ocean"
        tooltip="Click to select"
        animation="transition duration-300 transform hover:scale-105"
        fullscreen={false}
        collapsible={true}
      />
    </div>
  );
};

export default VerticalMenuExample;
