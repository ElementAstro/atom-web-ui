import React from "react";
import CollapseButtonGroup from "../components/CollapseButtonGroup";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineInfoCircle,
  AiOutlineUser,
  AiOutlineBell,
} from "react-icons/ai";

const CollapseButtonGroupExample: React.FC = () => {
  const buttons = [
    {
      label: "Home",
      value: "home",
      icon: <AiOutlineHome />,
      tooltip: "Go to Home",
    },
    {
      label: "Settings",
      value: "settings",
      icon: <AiOutlineSetting />,
      tooltip: "Open Settings",
    },
    {
      label: "Info",
      value: "info",
      icon: <AiOutlineInfoCircle />,
      tooltip: "More Info",
    },
    {
      label: "Profile",
      value: "profile",
      icon: <AiOutlineUser />,
      tooltip: "View Profile",
    },
    {
      label: "Notifications",
      value: "notifications",
      icon: <AiOutlineBell />,
      tooltip: "View Notifications",
    },
  ];

  const handleButtonClick = (value: string) => {
    console.log(`Button clicked: ${value}`);
  };

  const handleButtonHover = (value: string) => {
    console.log(`Button hovered: ${value}`);
  };

  const handleButtonFocus = (value: string) => {
    console.log(`Button focused: ${value}`);
  };

  const handleButtonBlur = (value: string) => {
    console.log(`Button blurred: ${value}`);
  };

  const handleToggle = (isOpen: boolean) => {
    console.log(`Menu is now ${isOpen ? "open" : "closed"}`);
  };

  return (
    <div className="p-4">
      <CollapseButtonGroup
        mainLabel="Menu"
        buttons={buttons}
        onButtonClick={handleButtonClick}
        onButtonHover={handleButtonHover}
        onButtonFocus={handleButtonFocus}
        onButtonBlur={handleButtonBlur}
        onToggle={handleToggle}
        direction="vertical"
        buttonSize={3} // Button size in rem
        buttonColor="bg-gradient-to-r from-purple-500 to-red-500"
        theme="light"
        tooltip="Main Menu"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="left"
        draggable={true}
        ariaLabel="Example collapse button group"
        customClass="shadow-lg"
        customButtonClass="hover:bg-purple-700"
        customLabelClass="text-black"
        customGroupClass="bg-gray-100 p-4 rounded-lg"
        shadow={true}
        hoverEffect={true}
        borderStyle="solid"
        borderColor="gray-300"
        textTransform="capitalize"
      />
    </div>
  );
};

export default CollapseButtonGroupExample;